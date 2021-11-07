function isPalindrome(x) {
  let start = 0;
  let end = x.length -1;
  let result = true;
  
  for (start, end ; start < x.length/2; start++, end--) {
    if(x[start].toUpperCase() != x[end].toUpperCase()){
      result = false
    }
  }
  return result
}