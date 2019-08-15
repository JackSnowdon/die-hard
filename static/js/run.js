function die6() {
  return Math.floor(Math.random() * 6) + 1;
}

$(document).ready(function(){
  
  $("#roll").click(function(){
    $('#die').text(die6);
  });
  
  
});