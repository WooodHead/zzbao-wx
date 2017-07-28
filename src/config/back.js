function back () {
  if(window.history.length > 1){
      window.history.go( -1 ); 
      if (this.$route.query.platform === 'app') {
        jsToApp.setTitle(document.title)
      }
  }else{  
      jsToApp.back();
  } 
}