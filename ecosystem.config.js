module.exports = {
  apps : [{
    name      : 'diego-service',
    script    : 'dist/app.js',
    exec_mode: 'cluster',
    instances: "max",
    env: {
      name : 'diego-dev',
      PORT: 8080,
      NODE_ENV: 'development'
    },
    env_production : {
      name : 'diego-pro',
      PORT: 8081,
      NODE_ENV: 'production'
    }
  }]
}
