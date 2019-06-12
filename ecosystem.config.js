module.exports = {
  apps : [{
    name      : 'diego-service',
    script    : 'dist/app.js',
    exec_mode: 'cluster',
    instances: "max",
    env: {
      name : 'diego-dev',
      NODE_ENV: 'development'
    },
    env_production : {
      name : 'diego-pro',
      NODE_ENV: 'production'
    }
  }]
}
