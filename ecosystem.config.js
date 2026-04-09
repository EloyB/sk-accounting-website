module.exports = {
  apps: [
    {
      name: 'sk-accounting',
      script: 'pnpm',
      args: 'start',
      cwd: '/var/www/sk-accounting',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
    },
  ],
}
