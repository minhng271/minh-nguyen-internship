function getOptions() {
  const optionSelect = document.getElementById('mySelect');
  let txt = 'Number of items : ';
  const countOptions = document.getElementById('mySelect').length;
  txt += countOptions;

  for (let i = 0; i < optionSelect.length; i += 1) {
    txt = `${txt}\n${optionSelect.options[i].text}`;
  }

  document.writeln(txt);
}

const button = document.getElementById('get');

button.onclick = getOptions();