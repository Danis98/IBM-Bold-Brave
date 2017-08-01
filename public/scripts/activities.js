function areYouSure(lv,mod,act,ans=-1){
  var newHtml="";
  if(ans==-1){
    newHtml+="<div class='row' align='center'>Are you sure, Bro?</div>";
    newHtml+="<div class='row'><div class='col-sm-1'></div>";
    newHtml+="<div class='col-sm-4'><button type='button' onclick='areYouSure("+lv+","+mod+","+act+",1)' class='test-btn text-center btn-no-padding' id='activityOption1'>Yes</button></div>";
    newHtml+="<div class='col-sm-2'></div>";
    newHtml+="<div class='col-sm-4'><button type='button' onclick='areYouSure("+lv+","+mod+","+act+",0)' class='test-btn text-center btn-no-padding' id='activityOption1'>No</button></div>";
    newHtml+="<div class='col-sm-1'></div></div>";
  }
  else if(ans==0){
    newHtml +="<input type='checkbox' onclick='areYouSure("+lv+","+mod+","+act+")'>";
    newHtml += "<label for='subscribeNews'>Activity completed</label> </div>";
  }
  else{
    newHtml +="<input type='checkbox' disabled='disabled' onclick='areYouSure("+lv+","+mod+","+act+")' checked>";
    newHtml += "<label for='subscribeNews'>Activity completed</label> </div>";
  }
  document.getElementById('completedCheck'+act).innerHTML = newHtml;
}

function initActivities(lv, mod)
{
  if(lv > level)
  {
    var msg = "<div class='activity-locked-message'>Error! You haven't unlocked this module yet!</div>";
    document.getElementById("activity-main-container").innerHTML = msg;
  }
  else
  {
      var newHtml = "";

      for(var i=0; i<activityCube[lv][mod].length; i++)
      {
        newHtml += "<div class='panel panel-default collapse-container'>";
        newHtml += "<div class='panel-heading collapse-trigger'>"+activityCube[lv][mod][i].name;
        newHtml += "<span style='float: right'><i>"+activityCube[lv][mod][i].points+"Pt.</i></span></div>";
        newHtml += "<div class='panel-body box-collapsed collapsable'>"+activityCube[lv][mod][i].descr;
        newHtml += "<div id='completedCheck"+i+"'> <input type='checkbox' onclick='areYouSure("+lv+","+mod+","+i+")' ";
        if(activityCube[lv][mod][i].completed) newHtml += "checked";
        newHtml += ">";
        newHtml += "<label for='subscribeNews'>Activity completed</label> </div>";
        newHtml += "</div> </div>";
      }
      document.getElementById("activitiesContainer").innerHTML = newHtml;

      document.getElementById("activities-module-title").innerHTML = modulesMat[lv][mod].name;
      document.getElementById("activities-module-description").innerHTML = "descrizione "+lv+" "+mod;

      document.getElementById("activities-module-video").src = "http://www.youtube.com/embed/_Xcmh1LQB9I";
  }
}

//old activities html:
/*<div class="panel panel-default collapse-container">
  <div class="panel-heading collapse-trigger">
    ACTIVITY 1
  </div>
  <div class="panel-body box-collapsed collapsable">
     ABBASSO IL LATINO
     <form>
        <div>
          <input type="checkbox" value="newsletter">
          <label for="subscribeNews">Activity completed</label>
        </div>
        <div>
          <button type="submit">Confirm</button>
        </div>
      </form>
  </div>
</div>*/
