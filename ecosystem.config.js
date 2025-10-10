// ecosystem.config.js - PM2 Configuration for Quastrom Trust
// PM2 ecosystem.config.js
// This file defines how PM2 runs and manages your app in different environments.
// Docs: https://pm2.keymetrics.io/docs/usage/application-declaration/

module.exports = {
    apps: [
      // --- STAGING ENVIRONMENT ---
      // To run: pm2 start ecosystem.config.js --only trust-quastrom-staging
      // Or: NODE_ENV=staging PORT=8091 pm2 start ecosystem.config.js --only trust-quastrom-staging --update-env
      {
        name: "cabinetdab-staging", // Unique name for this process
        script: "./current/standalone/server.js",
        cwd: "/var/www/cabinetdab.com/staging", // Working directory
        instances: 1, // How many processes to run (1 for dev/staging, 'max' for production)
        exec_mode: "fork", // 'fork' for single process, 'cluster' for multi-core
  
        env: {
          NODE_ENV: "staging",
          PORT: 8091,
          APP_ENV: "staging",
        },
  
        // Performance and reliability settings
        max_memory_restart: "512M", // Restart if process exceeds 512MB
        autorestart: true,
        max_restarts: 10,
        min_uptime: "10s",
  
        // Logging
        error_file: "./logs/pm2-error.log",
        out_file: "./logs/pm2-out.log",
        log_file: "./logs/pm2-combined.log",
        time: true,
        log_date_format: "YYYY-MM-DD HH:mm:ss Z",
  
        // Monitoring
        watch: false,
  
        // Graceful shutdown
        kill_timeout: 5000, // Time to wait before force-kill
      },
  
      // --- PRODUCTION ENVIRONMENT ---
      // To run: pm2 start ecosystem.config.js --only trust-quastrom-production
      // Or: NODE_ENV=production PORT=8090 pm2 start ecosystem.config.js --only trust-quastrom-production --update-env
      {
        name: "cabinetdab-production",
        script: "./current/standalone/server.js",
        cwd: "/var/www/cabinetdab.com/prod",
        instances: "max",
        exec_mode: "cluster",
  
        // Environment variables
        env: {
          NODE_ENV: "production",
          PORT: 8090,
          APP_ENV: "production",
        },
  
        // Performance and reliability settings (stricter for production)
        max_memory_restart: "1G",
        autorestart: true,
        max_restarts: 5,
        min_uptime: "30s",
        restart_delay: 4000,
  
        // Logging
        error_file: "./logs/pm2-error.log",
        out_file: "./logs/pm2-out.log",
        log_file: "./logs/pm2-combined.log",
        time: true,
        log_date_format: "YYYY-MM-DD HH:mm:ss Z",
        merge_logs: true,
  
        // Monitoring
        watch: false,
        ignore_watch: ["node_modules", "logs", ".git"],
  
        // Graceful shutdown
        kill_timeout: 10000, // Time to wait before force-kill
  
        // Health check
        health_check_grace_period: 3000,
      },
    ],
  };