import React, { useState, useEffect } from 'react';
import { Lead, LeadStatus } from '../types';
import { 
  Users, 
  TrendingUp, 
  PhoneCall, 
  MessageCircle, 
  Search, 
  Clock, 
  RefreshCw,
  ShieldCheck
} from 'lucide-react';

interface AdminCrmProps {
  initialLeads?: Lead[];
}

export const AdminCrm: React.FC<AdminCrmProps> = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>('TẤT CẢ');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success && data.leads) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error("Không thể tải dữ liệu leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: LeadStatus) => {
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    } catch (err) {
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    }
  };

  const filteredLeads = leads.filter(lead => {
    const statusMap: Record<string, string> = {
      'NEW': 'MỚI',
      'CONTACTED': 'ĐÃ LIÊN HỆ',
      'CONVERTED': 'ĐÃ NHẬP HỌC'
    };
    const mappedStatus = statusMap[lead.status] || lead.status;
    const matchesStatus = statusFilter === 'TẤT CẢ' || mappedStatus === statusFilter || lead.status === statusFilter;
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.desiredCourse.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.phone.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  // Analytics Metrics
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'NEW').length;
  const contactedLeads = leads.filter(l => l.status === 'CONTACTED').length;
  const convertedLeads = leads.filter(l => l.status === 'CONVERTED').length;
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950 border border-amber-800 text-amber-400 text-xs font-semibold mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>HỆ THỐNG CRM QUẢN TRỊ ACADEMY</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Quản Lý Tư Vấn & Nhập Học
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Theo dõi trực tiếp danh sách phụ huynh đăng ký học thử và nhắn tin Zalo chăm sóc.
            </p>
          </div>

          <button
            onClick={fetchLeads}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-xs text-slate-300 font-semibold cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${loading ? 'animate-spin' : ''}`} />
            <span>Đồng Bộ Dữ Liệu Realtime</span>
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-1">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Tổng Số Đăng Ký</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">{totalLeads}</div>
            <div className="text-[10px] text-slate-500">Tất cả kênh đăng ký</div>
          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-1">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Mới (Cần Tư Vấn)</span>
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            </div>
            <div className="text-2xl font-extrabold text-amber-400">{newLeads}</div>
            <div className="text-[10px] text-amber-400/80">Chờ gọi điện hỗ trợ</div>
          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-1">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Đã Liên Hệ / Đặt Lịch</span>
              <PhoneCall className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-extrabold text-cyan-400">{contactedLeads}</div>
            <div className="text-[10px] text-slate-500">Đã chốt lịch test</div>
          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-1">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Đã Nhập Học</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-400">{convertedLeads} ({conversionRate}%)</div>
            <div className="text-[10px] text-emerald-400/80">Đã nộp học phí</div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Tìm theo tên, SĐT hoặc khóa học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-xs text-white placeholder-slate-500"
            />
          </div>

          {/* Status Pipeline Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {['TẤT CẢ', 'MỚI', 'ĐÃ LIÊN HỆ', 'ĐÃ NHẬP HỌC'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  statusFilter === status
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

        </div>

        {/* Lead Table */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950/80 text-slate-400 border-b border-slate-800 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Họ Tên & SĐT</th>
                  <th className="p-4">Khối Lớp</th>
                  <th className="p-4">Khóa Học Mong Muốn</th>
                  <th className="p-4">Nguồn</th>
                  <th className="p-4">Ngày Đăng Ký</th>
                  <th className="p-4">Trạng Thái</th>
                  <th className="p-4 text-right">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-200">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                      Không tìm thấy đăng ký phù hợp với bộ lọc.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-800/50 transition-colors">
                      
                      {/* Name & Phone */}
                      <td className="p-4">
                        <div className="font-bold text-white text-sm">{lead.name}</div>
                        <div className="text-cyan-400 font-mono text-[11px]">{lead.phone}</div>
                        {lead.email && <div className="text-[10px] text-slate-400">{lead.email}</div>}
                      </td>

                      {/* Grade */}
                      <td className="p-4 text-slate-300">
                        {lead.grade || "Chưa xác định"}
                      </td>

                      {/* Desired Course */}
                      <td className="p-4">
                        <div className="font-semibold text-slate-200 max-w-xs">{lead.desiredCourse}</div>
                        {lead.notes && <div className="text-[10px] text-slate-400 italic mt-0.5">"{lead.notes}"</div>}
                      </td>

                      {/* Source */}
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 font-mono text-[10px] text-slate-400">
                          {lead.source}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="p-4 text-slate-400 text-[11px]">
                        {new Date(lead.createdAt).toLocaleDateString('vi-VN')}
                      </td>

                      {/* Status Dropdown */}
                      <td className="p-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateStatus(lead.id, e.target.value as LeadStatus)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer ${
                            lead.status === 'NEW' ? 'bg-amber-950 border-amber-800 text-amber-400' :
                            lead.status === 'CONTACTED' ? 'bg-blue-950 border-blue-800 text-cyan-400' :
                            'bg-emerald-950 border-emerald-800 text-emerald-400'
                          }`}
                        >
                          <option value="NEW">MỚI (NEW)</option>
                          <option value="CONTACTED">ĐÃ LIÊN HỆ (CONTACTED)</option>
                          <option value="CONVERTED">ĐÃ NHẬP HỌC (CONVERTED)</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right space-x-2">
                        <a
                          href={`https://zalo.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow transition-all"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Chat Zalo</span>
                        </a>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
