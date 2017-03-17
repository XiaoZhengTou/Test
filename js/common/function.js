// Public Function Begin
var publicFunction = {
    addStyle:function(filename){
        var cssUrl = require.toUrl("css/" + filename);
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = cssUrl;
        document.getElementsByTagName("head")[0].appendChild(link);
    },
    removeStyle:function(filename1,filename2,filename3){Array.prototype.forEach.call(document.querySelectorAll('style,[rel="stylesheet"],[type="text/css"]'), function(element){
  			try{
  				if ((element.href.indexOf(filename1) > 0) || (element.href.indexOf(filename2) > 0) || (element.href.indexOf(filename3) > 0)){
  					element.parentNode.removeChild(element);
  				}
  			}catch(err){}
		})
	},
  // 下面这个函数是用来修正数组中的$index索引错误
  arrayIndex:function(arraytosearch, key, valuetosearch) {
      for (var i = 0; i < arraytosearch.length; i++) {
        if (arraytosearch[i][key] == valuetosearch) {
        return i;
        }
      }
      return -1;
  },
  // 本地存储开始
  localSet : function(obj,key){
    var newObj = obj;
    var str = JSON.stringify(newObj);
    localStorage.setItem(key,str);
  },
  localGet : function(key){
      var str = localStorage.getItem(key);
      return JSON.parse(str);
  },
  localClear : function(key){
    localStorage.removeItem(key);
  }
  // 本地存储结束
}
// Public Function End