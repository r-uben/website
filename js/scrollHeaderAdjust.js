var bdScrll = document.getElementById("bd");
var hdr = document.getElementById("hdr");
var ftr = document.getElementById("ftr");

bdScrll.onscroll = function()  { scrollFunction() };

function scrollFunction() {
  if (bdScrll.scrollTop > 0 ) {
    hdr.classList.add("sticky");
    bd.classList.add("sticky");
  } 
else {
    hdr.classList.remove("sticky");
    bdScrll.classList.remove("sticky");
  }
}