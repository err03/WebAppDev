
// get the games.json file, and get ready first
const xhr = new XMLHttpRequest(),url = "assets/json/games.json";
var menuItems = null;

  xhr.onreadystatechange = function() {
    // xhr.open("GET",url)
    // xhr.setRequestHeader("Access-Control-Allow-Origin","*")
    // xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8")
    // while http is ready, the loading page shows
    var landing = document.getElementById("landing");

    if ( xhr.readyState === 4 && xhr.status === 200 ) {
      menuItems = JSON.parse( xhr.responseText );
      console.log("ready"+menuItems);
      // set the time about 3 sec,then shows out the menu
      setTimeout(function(){
        landing.style.display ="none";
        createMenu(menuItems);
      },3000);
      
      
      // menuItems now holds the objects parsed from the JSON file. You will need to iterate over this and build a template html
    }
  };
  xhr.open( "GET", url, true );
  xhr.send();
  
// ----------------------Menu----------------------------
  // function that create the menu list
function createMenu(menuItems){
    var menu = document.getElementById("menu");
    
// for loop, to loop the json
    for(let item of menuItems){
      // create the element
        var div = document.createElement("div");
        var img = document.createElement("img");
        var p = document.createElement("p");
        var br = document.createElement("br");

        // set the attribute stuff
        div.className = "item";
        div.id = item["id"];
        div.setAttribute("onclick","popItem(true,this.id)");
        img.setAttribute("src","assets/img/"+item["picture"])
        p.append("Name:"+item["name"]);
        p.appendChild(br);
        p.append("Genre:"+item["Genre"]);

        // append them all
        div.appendChild(img);
        div.appendChild(p);
        menu.appendChild(div);
    }
}

// ----------------------Detail(pop out)------------------------------
// pop window that will click on the item
function popItem(bool,id){
  var popItem = document.getElementById("popItem");
  if(bool){
    popItem.style.display = "block";
    itemContent(id);
    blockCursor(true);
    return true;
  }else{
    popItem.style.display = "none";
    itemContentClean();
    blockCursor(false);
    return false;
  }
}

// while the window pop up, append the information
function itemContent(id){
  var content = document.getElementById("itemContent");
  var div = document.createElement("div");
  div.id = "itemInfo";

  var array = Array("name","releaseDate","developer(s)","Genre","description");

  for(let item of menuItems){
    if(item['id'] == id){
      for(var i =0;i<array.length;i++){
        var p = document.createElement("p");
        var upperCase = (array[i].charAt(0)).toUpperCase() + (array[i].substring(1,array[i].length));
        p.append(upperCase+":"+item[array[i]]);
        div.appendChild(p);
      }
    }
  }
  content.appendChild(div);
}

// function that remove the children nodes in pop content
function itemContentClean(){
  var content = document.getElementById("itemContent");
  for(var i=0;i<content.childNodes.length;i++){
    content.removeChild(content.childNodes[1]);
  }
}
// function that will block the cursor to click the other item,
// when the detail pop up
function blockCursor(bool){
  var menu = document.getElementById("menu");
  if(bool){
    menu.style.pointerEvents = "none";
  }else{
    menu.style.pointerEvents = "auto";
  }
}


