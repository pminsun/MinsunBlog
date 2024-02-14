module.exports = {
  apps: [{
      name: 'MinsunBlog',      //App name
      script: 'next start -p 8080',      //실행할 스크립트
      watch: true,
      ignore_watch : [            //해당폴더의 파일변경은 무시
        "node_modules", "uploads"
      ],
  }]
};
