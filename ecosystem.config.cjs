module.exports = {
  apps: [
    {
      name: "tuananhtinhoc-academy",
      script: "dist/server.cjs",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
