function initActivities(lv, mod)
{
  var newHtml = "";
  var activities = new Array(5);
  for(var i=0; i<activities.length; i++)
   activities[i] = {name:'activity'+i, descr:'description'+i, completed:(i%2==0)};
  for(var i=0; i<activities.length; i++)
  {
    newHtml += "<div class='panel panel-default collapse-container'>";
    newHtml += "<div class='panel-heading collapse-trigger'>"+activities[i].name+"</div>";
    newHtml += "<div class='panel-body box-collapsed collapsable'>"+activities[i].descr;
    newHtml += "<div> <input type='checkbox'";
    if(activities[i].completed) newHtml += "checked";
    newHtml += ">";
    newHtml += "<label for='subscribeNews'>Activity completed</label> </div>";
    newHtml += "</div> </div>";
  }
  document.getElementById("activitiesContainer").innerHTML = newHtml;
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
