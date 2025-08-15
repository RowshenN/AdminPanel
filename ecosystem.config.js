module.exports = {
  apps: [
    {
      name: "admin-3000",
      script: "serve",
      args: ["-s", "build", "-l", "3000"],
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
