// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
window.onload = function(){
  document.querySelector("#select-cat").value = getHashValue("cat");
  document.querySelector("#select-asc").value = getHashValue("asc");
  document.querySelector("#select-length").value = getHashValue("num");
}

$(document).on("change", "#select-cat", function(){
  location.href = createNewURL(location.href, "cat", document.querySelector("#select-cat").value);
});

$(document).on("change", "#select-asc", function(){
  location.href = createNewURL(location.href, "asc", document.querySelector("#select-asc").value);
});

$(document).on("click", "#submit-length", function(){
  location.href = createNewURL(location.href, "num", document.querySelector("#select-length").value);
});

$(document).on("click", "#mybooks", function(){
  if(document.querySelector("#mybooks").textContent === "Hide My Books"){
    document.querySelector("#mybooks").textContent = "See My Books";
    document.querySelector("#hiddenlist").setAttribute("style", "visibility: hidden");
  }else{
    document.querySelector("#mybooks").textContent = "Hide My Books";
    document.querySelector("#hiddenlist").setAttribute("style", "visibility: visible");
  }
});

$(document).on("click", "#book", function(){
  noduplicates = true;
  count = 0;
  while(count < document.querySelector("#mybooklist").childNodes.length && noduplicates){
    if(this.querySelector("#title").textContent === document.querySelector("#mybooklist").childNodes[count].textContent){
      noduplicates = false;
    }
    count += 1;
  }
  if(noduplicates){
    mybook = document.createElement("div");
    mybook.id= "mybook";
    mybook.textContent = this.querySelector("#title").textContent;
    document.querySelector("#mybooklist").appendChild(mybook);
    checkoutAvailable()
  }
});

$(document).on("click", "#mybook", function(){
  document.querySelector("#mybooklist").removeChild(this);
  checkoutAvailable();
});

$(document).on("click", "#checkout", function(){
  document.querySelector("#checkout-bg").setAttribute("style", "visibility: visible");
  document.querySelector("#checkout-prompt").setAttribute("style", "visibility: visible");

});

$(document).on("click", "#cancel", function(){
  document.querySelector("#checkout-bg").setAttribute("style", "visibility: hidden");
  document.querySelector("#checkout-prompt").setAttribute("style", "visibility: hidden");
});

$(document).on("click", "#checkout-page", function(){
  alert("feature coming soon");
});

function createNewURL(url, param_name, param_value){
  if (url.indexOf("?") >= 0){
    let params = url.substring(url.indexOf("?") + 1).split("&");
    let paramFound = false;
    params.forEach(function(param, index) {
      let p = param.split("=");
      if (p[0] == param_name) {
        params[index] = param_name + "=" + param_value;
        paramFound = true;
      }
    });
    if (!paramFound) params.push(param_name + "=" + param_value);
    url = url.substring(0, url.indexOf("?")+1) + params.join("&");
  }else{
    url += "?" + param_name + "=" + param_value;
  }
  return url;
}

function getHashValue(key) {
  var start = location.search.indexOf(key)+key.length+1;
  var count = start;
  var end = start;
  while(count < location.search.length){
    if(location.search[count] != "&"){
      count += 1;
      end = count;
    }else{
      end = count;
      count = location.search.length;
    }
  }
  var value = (location.search).substring(start, end);
  return value;
}

function checkoutAvailable(){
  if(document.querySelector("#mybooklist").childNodes.length > 0){
    document.querySelector("#checkout").setAttribute("style", "visibility: inherit");
  }else{
    document.querySelector("#checkout").setAttribute("style", "visibility: hidden");
  }
}
