var levelsArr;
var userPoints;
var userName;
var level, num_levels;
var modulesMat;
var profileImg;

var bravometerData;

function init()
{
  var usr="biglenny";
  var result;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      result = JSON.parse(this.responseText);
    }
  };
  xhttp.open("GET", "/api/user/"+usr, false);
  xhttp.send();

  result = result[0];
  console.log(result);

  userName = result.name;
  profileImg = result.img;

  var resultLvl;
  var xhttpLvl = new XMLHttpRequest();
  xhttpLvl.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      resultLvl = JSON.parse(this.responseText);
    }
  };
  xhttpLvl.open("GET", "/api/levels", false);
  xhttpLvl.send();

  levelsArr = new Array(resultLvl.length);
  for(var i=0; i<levelsArr.length; i++) //prendere dati db
   levelsArr[i] = {name:resultLvl[i].name, points:resultLvl[i].points_needed, perComp:0};

  num_levels = levelsArr.length;

  modulesMat = new Array(num_levels);
  for(var i=0; i<num_levels; i++)
    modulesMat[i] = new Array(resultLvl[i].modules.length);

  userPoints=result.points;
  for(var i=0; i<num_levels; i++) //prendere dati dbresultLvl[i].modules[j].
    for(var j=0; j<modulesMat[i].length; j++)
    {
      modulesMat[i][j] = {name:resultLvl[i].modules[j].name, points:resultLvl[i].modules[j].point, points_done:0};
    }

  for(var i=0; i<result.completed.length; i++)
    modulesMat[result.completed[i].lvl_id][result.completed[i].mod_id].points_done += resultLvl[result.completed[i].lvl_id].modules[result.completed[i].mod_id].activities[result.completed[i].act_id].points;

  for(level=0; level<num_levels && levelsArr[level].points <= userPoints; level++);
  level--;

  for(var i=0; i<num_levels; i++) //compute levels' percentages
  {
    var tot = 0, done = 0;
    for(var j=0; j<modulesMat[i].length; j++)
    {
      tot += modulesMat[i][j].points;
      done += modulesMat[i][j].points_done;
    }

    levelsArr[i].perComp = Math.floor(done / tot * 100);
  }

  bravometerData = new Array(result.res_bravetest.length);
  for(var i=0; i<bravometerData.length; i++)
   bravometerData[i] = {date: result.res_bravetest[i].date, score: result.res_bravetest[i].score};
}
