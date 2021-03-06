window.onload = function() {
  //alert(document.getElementById('levelColumn').getBoundingClientRect().height);

  setTimeout(myMoveRocket, 1000);
}

var clickCountOnRocket=0,timerClickCountOnRocket=Date.now();
function rr(){
  if(Date.now()-timerClickCountOnRocket<1000){
    clickCountOnRocket++;
    if(clickCountOnRocket>2)
      document.location.href="/rocketrizzo";
  }
  else
    clickCountOnRocket=1;
  timerClickCountOnRocket=Date.now();
}

function myMoveRocket() {
  //alert(document.getElementById('levelColumn').style.height);

  var elem = document.getElementById("rocket");
  var per = 80;

  var per_final = 100-(level/num_levels)*100-(1/num_levels)*100+2;

  var interval = 2;
  var frame_per_interval = 0.01;
  var id = setInterval(frameRocket, interval);
  function frameRocket() {
    if(per<= per_final)
        clearInterval(id);
    else {
      per-=frame_per_interval;
      if(per-4 <= per_final)
        frame_per_interval=0.02;
      else
        frame_per_interval+=0.01;

      elem.style.top = per + '%';
    }
  }
}

var actual_level_list;

function makeLevelColumn()
{
   var newHtml = "";

   for(var i=levelsArr.length-1;i>=0;i--)
   {
     newHtml += "<ul class='list-group list-group-padding'>";
     newHtml += "<li class='list-group-item ";

     if(levelsArr[i].points > userPoints)
      newHtml+="disabled'";
     else if(levelsArr[i].perComp==0)
      newHtml+="list-group-item-danger'";
     else if(levelsArr[i].perComp==100)
      newHtml+="list-group-item-success'"
     else
      newHtml+="list-group-item-warning'";

      if(levelsArr[i].points <= userPoints)
       newHtml+="onclick='changeMiddleColumn("+i+")'";
      newHtml+=">"+levelsArr[i].name;

      newHtml+="<span class='badge'>";
      if(levelsArr[i].points > userPoints)
       newHtml+="<span class='glyphicon glyphicon-lock'></span>";
      else
       newHtml+=levelsArr[i].perComp+"%";

      newHtml+="</span> </li> </ul>";
    }

    document.getElementById("levelColumn").innerHTML = newHtml;

    document.getElementById('rocket-container').style.height = document.getElementById('levelColumn').getBoundingClientRect().height+"px";

}

function initProgressBar()
{
  var mod_bar_percentage = level+1 < levelsArr.length ? Math.floor(userPoints / levelsArr[level+1].points * 100) : 100;
  var points_to_next = level+1 < levelsArr.length ? levelsArr[level+1].points - userPoints : 0;
  document.getElementById("progressBarText").innerHTML = "Points until next level: "+points_to_next;
  document.getElementById("progressBarPerc").innerHTML = mod_bar_percentage+"%";
  document.getElementById("progressBarWidth").style.width = mod_bar_percentage+"%";
}

function decreaseLevel()
{
  actual_level_list = (actual_level_list + level)%(level+1);
  changeMiddleColumn(actual_level_list);
}

function increaseLevel()
{
  actual_level_list = (actual_level_list + 1)%(level+1);
  changeMiddleColumn(actual_level_list);
}

function changeMiddleColumn(nmod)
{
  actual_level_list = nmod;
  var newHtml = "";

  for(var i=0; i<modulesMat[nmod].length; i++)
  {
    newHtml += "<ul class='list-group'>";
    newHtml += "<a href='/activity/"+nmod+"/"+i+"' style='text-decoration: none;'>";
    newHtml += "<li class='list-group-item ";
    if(modulesMat[nmod][i].points == modulesMat[nmod][i].points_done)
     newHtml += "list-group-item-success'>";
    else
     newHtml += "list-group-item-info'>";

    newHtml += "<span>"+modulesMat[nmod][i].name+"</span>";
    newHtml += "<span style='float:right'><i>"+modulesMat[nmod][i].points_done+"/"+modulesMat[nmod][i].points+" Pt.</i></span>";

    newHtml += "</li>";
    newHtml += "</a>";
    newHtml += "</ul>";
  }

  document.getElementById("modulesTitle").innerHTML = levelsArr[nmod].name;
  document.getElementById("modulesList").innerHTML = newHtml;
}

function makeLeaderboard()
{
  var result;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      result = JSON.parse(this.responseText);
    }
  };
  xhttp.open("GET", "/api/leaderboard", false);
  xhttp.send();

  var newHtml="";
  for(var i=0; i<result.length; i++)
  {
    newHtml += '<li class="list-group-item leaderboard-entry">';
    newHtml += '<a href="#profile" class="">';
    newHtml += '<div class="leaderboard-image profile-image-container rounded-container img-circle">'
    newHtml += '<img class="" src="'+result[i].img+'" class="rounded" />'
    newHtml += '</div>';
    newHtml += '<div class="leaderboard-position">'+(i+1)+'</div><div class="leaderboard-inline-name">'+result[i].name+'</div>';
    newHtml += '<div class="leaderboard-inline-points">'+result[i].points+' Pt.</div>';
    newHtml += '</a>';
    newHtml += '</li>';
  }

  document.getElementById("leaderboard").innerHTML = newHtml;
}

function fixHeightRocket(){
  //alert(document.getElementById("levelColumn").style.height);
  //console.log(document.getElementById('levelColumn').style.height);
  //document.getElementById('rocket-container').style.height = document.getElementById('levelColumn').style.height;

}
