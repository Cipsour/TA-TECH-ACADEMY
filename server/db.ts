import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import crypto from 'crypto';

export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  passwordHash: string;
  avatarUrl?: string;
  phone?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  grade?: string;
  desiredCourse: string;
  notes?: string;
  source: 'FORM' | 'ZALO' | 'LANDING';
  status: 'NEW' | 'CONTACTED' | 'CONVERTED';
  createdAt: string;
  updatedAt?: string;
}

const INITIAL_SEEDS: Lead[] = [
  {
    id: "lead-101",
    name: "Nguyen Van An",
    phone: "0912345678",
    email: "an.nguyen@gmail.com",
    grade: "Grade 7 (Secondary)",
    desiredCourse: "Middle School Programming Roadmap (Python & Scratch)",
    notes: "Phụ huynh tìm lớp cuối tuần cho con định hướng lập trình & robotics.",
    source: "FORM",
    status: "NEW",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: "lead-102",
    name: "Tran Thi Mai",
    phone: "0987654321",
    email: "mai.tran@office.com",
    grade: "Working Professional",
    desiredCourse: "Applied AI & Prompt Engineering for Productivity",
    notes: "Muốn học gói đào tạo AI ứng dụng cho khối văn phòng buổi tối.",
    source: "ZALO",
    status: "CONTACTED",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: "lead-103",
    name: "Le Hoang Nam",
    phone: "0901122334",
    email: "nam.le@student.edu.vn",
    grade: "University Senior",
    desiredCourse: "MOS Certification (Word, Excel, PowerPoint)",
    notes: "Cần chứng chỉ tin học quốc tế chuẩn bị nộp hồ sơ tốt nghiệp.",
    source: "FORM",
    status: "CONVERTED",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

// Đường dẫn file lưu trữ cục bộ đảm bảo an toàn dữ liệu
const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

/**
 * Băm mật khẩu bằng HMAC-SHA256 với Salt an toàn
 */
export function hashPassword(password: string): string {
  const salt = process.env.AUTH_SALT || "ta_tech_academy_auth_salt_2026";
  return crypto.createHmac('sha256', salt).update(password).digest('hex');
}

/**
 * Xác minh mật khẩu nhập vào có trùng khớp với hash lưu trữ không
 */
export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// Danh sách tài khoản người dùng mẫu ban đầu
const INITIAL_USERS: User[] = [
  {
    id: "user-admin-01",
    email: "admin@tuananhtinhoc.info.vn",
    name: "Thầy Tuấn Anh (Admin)",
    role: "ADMIN",
    passwordHash: hashPassword("Admin@123456"),
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    phone: "0988888888",
    createdAt: new Date().toISOString()
  },
  {
    id: "user-student-01",
    email: "hocvien@tuananhtinhoc.info.vn",
    name: "Nguyễn Minh Quân (Học viên)",
    role: "STUDENT",
    passwordHash: hashPassword("Hocvien@123456"),
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80",
    phone: "0912345678",
    createdAt: new Date().toISOString()
  }
];

// Khởi tạo Prisma Client an toàn (nếu đã cài đặt và có DATABASE_URL)
let prismaInstance: any = null;

async function getPrismaClient() {
  if (prismaInstance !== null) return prismaInstance;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl || databaseUrl.trim() === '' || databaseUrl.includes('MY_DATABASE_URL')) {
    return null;
  }

  try {
    // Dynamic import to prevent crash if @prisma/client is not yet generated
    const { PrismaClient } = await import('@prisma/client');
    prismaInstance = new PrismaClient();
    // Test connection
    await prismaInstance.$connect();
    console.log("✅ [DB] Đã kết nối thành công tới PostgreSQL Database qua Prisma!");
    return prismaInstance;
  } catch (error) {
    console.warn("⚠️ [DB] Chưa thể kết nối PostgreSQL. Tự động chuyển sang chế độ File Storage bền vững (data/leads.json). Chi tiết:", (error as Error).message);
    prismaInstance = null;
    return null;
  }
}

/**
 * Đảm bảo thư mục data và file leads.json luôn tồn tại và có dữ liệu khởi tạo
 */
async function ensureFileStorage(): Promise<Lead[]> {
  try {
    if (!fsSync.existsSync(DATA_DIR)) {
      await fs.mkdir(DATA_DIR, { recursive: true });
    }

    if (!fsSync.existsSync(LEADS_FILE)) {
      await fs.writeFile(LEADS_FILE, JSON.stringify(INITIAL_SEEDS, null, 2), 'utf-8');
      return INITIAL_SEEDS;
    }

    const content = await fs.readFile(LEADS_FILE, 'utf-8');
    if (!content.trim()) {
      await fs.writeFile(LEADS_FILE, JSON.stringify(INITIAL_SEEDS, null, 2), 'utf-8');
      return INITIAL_SEEDS;
    }

    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : INITIAL_SEEDS;
  } catch (err) {
    console.error("Lỗi khi đọc file leads.json, dùng dữ liệu khởi tạo:", err);
    return INITIAL_SEEDS;
  }
}

/**
 * Ghi danh sách Leads vào file an toàn (Atomic Write)
 */
async function saveLeadsToFile(leads: Lead[]): Promise<void> {
  if (!fsSync.existsSync(DATA_DIR)) {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
  const tempFile = `${LEADS_FILE}.tmp.${Date.now()}`;
  await fs.writeFile(tempFile, JSON.stringify(leads, null, 2), 'utf-8');
  await fs.rename(tempFile, LEADS_FILE);
}

/**
 * Lấy toàn bộ danh sách Lead
 */
export async function getAllLeads(): Promise<Lead[]> {
  const prisma = await getPrismaClient();
  if (prisma) {
    try {
      const dbLeads = await prisma.lead.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return dbLeads.map((l: any) => ({
        id: l.id,
        name: l.name,
        phone: l.phone,
        email: l.email || undefined,
        grade: l.grade || undefined,
        desiredCourse: l.desiredCourse,
        notes: l.notes || undefined,
        source: l.source as any,
        status: l.status as any,
        createdAt: l.createdAt instanceof Date ? l.createdAt.toISOString() : l.createdAt,
        updatedAt: l.updatedAt instanceof Date ? l.updatedAt.toISOString() : l.updatedAt
      }));
    } catch (err) {
      console.warn("Lỗi truy vấn Prisma, fallback về file:", err);
    }
  }

  // Fallback sang File Storage
  return await ensureFileStorage();
}

/**
 * Tạo Lead mới và lưu trữ bền vững vĩnh viễn
 */
export async function createLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>): Promise<Lead> {
  const newLead: Lead = {
    id: `lead-${Date.now()}`,
    name: leadData.name,
    phone: leadData.phone,
    email: leadData.email || '',
    grade: leadData.grade || 'General',
    desiredCourse: leadData.desiredCourse,
    notes: leadData.notes || '',
    source: leadData.source || 'FORM',
    status: 'NEW',
    createdAt: new Date().toISOString()
  };

  const prisma = await getPrismaClient();
  if (prisma) {
    try {
      const created = await prisma.lead.create({
        data: {
          id: newLead.id,
          name: newLead.name,
          phone: newLead.phone,
          email: newLead.email,
          grade: newLead.grade,
          desiredCourse: newLead.desiredCourse,
          notes: newLead.notes,
          source: newLead.source,
          status: newLead.status
        }
      });
      return {
        ...newLead,
        id: created.id,
        createdAt: created.createdAt instanceof Date ? created.createdAt.toISOString() : newLead.createdAt
      };
    } catch (err) {
      console.warn("Lỗi tạo lead trong Prisma, fallback về ghi file:", err);
    }
  }

  // Ghi vào file storage bền vững
  const currentLeads = await ensureFileStorage();
  currentLeads.unshift(newLead);
  await saveLeadsToFile(currentLeads);
  return newLead;
}

/**
 * Cập nhật trạng thái và ghi chú của Lead
 */
export async function updateLead(id: string, updates: { status?: Lead['status']; notes?: string }): Promise<Lead | null> {
  const prisma = await getPrismaClient();
  if (prisma) {
    try {
      const updated = await prisma.lead.update({
        where: { id },
        data: {
          ...(updates.status ? { status: updates.status } : {}),
          ...(updates.notes !== undefined ? { notes: updates.notes } : {})
        }
      });
      return {
        id: updated.id,
        name: updated.name,
        phone: updated.phone,
        email: updated.email || undefined,
        grade: updated.grade || undefined,
        desiredCourse: updated.desiredCourse,
        notes: updated.notes || undefined,
        source: updated.source as any,
        status: updated.status as any,
        createdAt: updated.createdAt instanceof Date ? updated.createdAt.toISOString() : updated.createdAt,
        updatedAt: updated.updatedAt instanceof Date ? updated.updatedAt.toISOString() : undefined
      };
    } catch (err) {
      console.warn("Lỗi update Prisma, fallback về file:", err);
    }
  }

  const currentLeads = await ensureFileStorage();
  const leadIndex = currentLeads.findIndex(l => l.id === id);
  if (leadIndex === -1) return null;

  if (updates.status) currentLeads[leadIndex].status = updates.status;
  if (updates.notes !== undefined) currentLeads[leadIndex].notes = updates.notes;
  currentLeads[leadIndex].updatedAt = new Date().toISOString();

  await saveLeadsToFile(currentLeads);
  return currentLeads[leadIndex];
}

/**
 * Xuất dữ liệu Leads dạng CSV chuẩn UTF-8 (có BOM hiển thị tiếng Việt chuẩn trong Excel)
 */
export async function generateLeadsCsv(): Promise<string> {
  const leads = await getAllLeads();
  
  const headers = ["Mã Lead", "Họ và Tên", "Số Điện Thoại", "Email", "Khối Lớp / Đối Tượng", "Khóa Học Đăng Ký", "Nguồn", "Trạng Thái", "Ghi Chú", "Thời Gian Tạo"];
  
  const escapeCsv = (str?: string) => {
    if (!str) return '""';
    return `"${str.replace(/"/g, '""')}"`;
  };

  const rows = leads.map(l => [
    escapeCsv(l.id),
    escapeCsv(l.name),
    escapeCsv(l.phone),
    escapeCsv(l.email),
    escapeCsv(l.grade),
    escapeCsv(l.desiredCourse),
    escapeCsv(l.source),
    escapeCsv(l.status),
    escapeCsv(l.notes),
    escapeCsv(new Date(l.createdAt).toLocaleString('vi-VN'))
  ].join(','));

  // \uFEFF là Byte Order Mark (BOM) để Microsoft Excel nhận diện mã hóa UTF-8 tiếng Việt
  return '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
}

/**
 * Đảm bảo file users.json luôn tồn tại và có tài khoản mẫu
 */
async function ensureUsersStorage(): Promise<User[]> {
  try {
    if (!fsSync.existsSync(DATA_DIR)) {
      await fs.mkdir(DATA_DIR, { recursive: true });
    }

    if (!fsSync.existsSync(USERS_FILE)) {
      await fs.writeFile(USERS_FILE, JSON.stringify(INITIAL_USERS, null, 2), 'utf-8');
      return INITIAL_USERS;
    }

    const content = await fs.readFile(USERS_FILE, 'utf-8');
    if (!content.trim()) {
      await fs.writeFile(USERS_FILE, JSON.stringify(INITIAL_USERS, null, 2), 'utf-8');
      return INITIAL_USERS;
    }

    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : INITIAL_USERS;
  } catch (err) {
    console.error("Lỗi khi đọc file users.json, fallback INITIAL_USERS:", err);
    return INITIAL_USERS;
  }
}

/**
 * Tìm kiếm người dùng bằng email (cho luồng đăng nhập)
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  const normalizedEmail = email.trim().toLowerCase();

  const prisma = await getPrismaClient();
  if (prisma) {
    try {
      const dbUser = await prisma.user.findUnique({
        where: { email: normalizedEmail }
      });
      if (dbUser) {
        return {
          id: dbUser.id,
          email: dbUser.email,
          name: dbUser.name,
          role: dbUser.role as UserRole,
          passwordHash: dbUser.passwordHash,
          avatarUrl: dbUser.avatarUrl || undefined,
          phone: dbUser.phone || undefined,
          createdAt: dbUser.createdAt instanceof Date ? dbUser.createdAt.toISOString() : dbUser.createdAt
        };
      }
    } catch (err) {
      console.warn("Lỗi tìm kiếm user trong Prisma, fallback về file:", err);
    }
  }

  const users = await ensureUsersStorage();
  return users.find(u => u.email.toLowerCase() === normalizedEmail) || null;
}

/**
 * Tìm kiếm người dùng bằng ID
 */
export async function findUserById(id: string): Promise<User | null> {
  const prisma = await getPrismaClient();
  if (prisma) {
    try {
      const dbUser = await prisma.user.findUnique({
        where: { id }
      });
      if (dbUser) {
        return {
          id: dbUser.id,
          email: dbUser.email,
          name: dbUser.name,
          role: dbUser.role as UserRole,
          passwordHash: dbUser.passwordHash,
          avatarUrl: dbUser.avatarUrl || undefined,
          phone: dbUser.phone || undefined,
          createdAt: dbUser.createdAt instanceof Date ? dbUser.createdAt.toISOString() : dbUser.createdAt
        };
      }
    } catch (err) {
      console.warn("Lỗi tìm user by ID trong Prisma, fallback về file:", err);
    }
  }

  const users = await ensureUsersStorage();
  return users.find(u => u.id === id) || null;
}

/**
 * Lấy danh sách toàn bộ người dùng
 */
export async function getAllUsers(): Promise<Omit<User, 'passwordHash'>[]> {
  const users = await ensureUsersStorage();
  return users.map(({ passwordHash, ...safeUser }) => safeUser);
}
