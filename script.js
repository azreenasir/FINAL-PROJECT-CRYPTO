// Function to count the occurrences of a specific letter in a string
function letterCount(letter, string) {
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === letter) {
      count++;
    }
  }
  return count;
}

// Function to remove characters from a string that are not present in the 'allowedCharacters' string
function remove(string, allowedCharacters) {
  let result = "";
  for (let i = 0; i < string.length; i++) {
    if (allowedCharacters.includes(string[i])) {
      result += string[i];
    }
  }
  return result;
}

// Function to remove spaces from the 'ciphertext' input field
function removeSpaces() {
  const ciphertext = document.getElementById("ciphertext");
  ciphertext.value = ciphertext.value.replace(/\s/g, "");
}

// Function to calculate the frequencies of letters in the 'ciphertext' input field
function frequencies() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const ciphertextMessage = document
    .getElementById("ciphertext")
    .value.toUpperCase();
  const nospaces = remove(ciphertextMessage, alphabet);

  const countsOrdered = [];
  const lettersOrdered = [];
  const percentages = [];

  // Loop through the alphabet and count the occurrences of each letter
  for (let p = 0; p < alphabet.length; p++) {
    const count = letterCount(alphabet.substr(p, 1), nospaces);
    countsOrdered.push(count);
    lettersOrdered.push(alphabet.substr(p, 1));
    percentages.push((count / nospaces.length) * 100);
  }

  // Sort arrays based on counts in descending order
  const sortedIndices = countsOrdered
    .map((_, index) => index)
    .sort((a, b) => countsOrdered[b] - countsOrdered[a]);
  const sortedLetters = sortedIndices.map((index) => lettersOrdered[index]);
  const sortedCounts = sortedIndices.map((index) => countsOrdered[index]);
  const sortedPercentages = sortedIndices.map((index) => percentages[index]);

  // Generate the HTML table to display the letter frequencies
  const frequenciesTable = `
<div class='container' style='margin-top: 20px'>
  <p>The frequencies of the English languages are:</p>
  <table id="freqTable" class="table" style="width:100%;" border="1">
    <tr class="table-primary">
      ${sortedLetters.map((letter) => `<col style="width:3%">`).join("")}
    </tr>
    <tr class="table-primary">
      ${sortedLetters
        .map((letter) => `<td style="text-align:center">${letter}</td>`)
        .join("")}
    </tr>
    <tr>
      ${sortedCounts
        .map((count) => `<td style="text-align:center">${count}</td>`)
        .join("")}
    </tr>
    <tr>
      ${sortedPercentages
        .map(
          (percentage) =>
            `<td style="text-align:center">${percentage.toFixed(1)}</td>`
        )
        .join("")}
    </tr>
    
  </table><br>
</div>
`;

  document.getElementById("wrapper1").innerHTML = frequenciesTable;
}

// Function to calculate the frequencies of digrams in the 'ciphertext' input field
function digrams() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const ciphertext = document.getElementById("ciphertext").value.toUpperCase();
  const nospaces = remove(ciphertext, alphabet);

  const countsOrdered = [];
  const digramsOrdered = [];

  // Loop through the 'nospaces' string and count the occurrences of each digram
  for (let i = 0; i < nospaces.length - 1; i++) {
    const digram = nospaces.substr(i, 2);
    if (!digramsOrdered.includes(digram)) {
      digramsOrdered.push(digram);
      const count = countDigrams(digram, nospaces);
      countsOrdered.push(count);
    }
  }

  // Sort the digrams and counts in descending order of frequency
  const sortedIndices = countsOrdered
    .map((_, index) => index)
    .sort((a, b) => countsOrdered[b] - countsOrdered[a]);
  const sortedDigrams = sortedIndices.map((index) => digramsOrdered[index]);
  const sortedCounts = sortedIndices.map((index) => countsOrdered[index]);

  const columns = 26; // Number of columns to display initially
  const numRows = Math.ceil(sortedDigrams.length / columns); // Number of rows needed

  let tableHtml = `
    <div class='container' style='margin-top: 20px'>
      <p>The frequencies of the digrams are:</p>
      <div class="table-responsive">
        <table id="freqTable" class="table" style="width:auto;" border="1">
          <tr class="table-primary">
  `;

  for (let i = 0; i < columns; i++) {
    tableHtml += `<col style="width:8%">`;
  }

  tableHtml += `
          </tr>
          <tr class="table-primary">
  `;

  for (let i = 0; i < columns; i++) {
    if (sortedDigrams[i]) {
      tableHtml += `<td style="text-align:center">${sortedDigrams[i]}</td>`;
    } else {
      break;
    }
  }

  tableHtml += `
          </tr>
          <tr>
  `;

  for (let i = 0; i < columns; i++) {
    if (sortedCounts[i]) {
      tableHtml += `<td style="text-align:center">${sortedCounts[i]}</td>`;
    } else {
      break;
    }
  }

  tableHtml += `
          </tr>
        </table>
      </div>
      <br>
    </div>
  `;

  if (numRows > 1) {
    for (let row = 1; row < numRows; row++) {
      tableHtml += `
        <div class='container' >
          <div class="table-responsive">
            <table id="freqTable" class="table" style="width:auto;" border="1">
              <tr class="table-primary">
      `;

      const startIndex = row * columns;
      const endIndex = startIndex + columns;
      const remainingDigrams = sortedDigrams.slice(startIndex, endIndex);

      for (const _ of remainingDigrams) {
        tableHtml += `<col style="width:8%">`;
      }

      tableHtml += `
              </tr>
              <tr class="table-primary">
      `;

      for (const digram of remainingDigrams) {
        if (digram) {
          tableHtml += `<td style="text-align:center">${digram}</td>`;
        } else {
          break;
        }
      }

      tableHtml += `
              </tr>
              <tr>
      `;

      for (let i = startIndex; i < endIndex; i++) {
        if (sortedCounts[i]) {
          tableHtml += `<td style="text-align:center">${sortedCounts[i]}</td>`;
        } else {
          break;
        }
      }

      tableHtml += `
              </tr>
            </table>
          </div>
          <br>
        </div>
      `;
    }
  }

  document.getElementById("wrapper2").innerHTML = tableHtml;
}

// Function to count the occurrences of a specific digram in a string
function countDigrams(digram, string) {
  let count = 0;
  let index = -1;
  while ((index = string.indexOf(digram, index + 1)) !== -1) {
    count++;
  }
  return count;
}

// Function to calculate the frequencies of trigrams in the 'ciphertext' input field
function trigrams() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const ciphertext = document.getElementById("ciphertext").value.toUpperCase();
  const nospaces = remove(ciphertext, alphabet);

  const countsOrdered = [];
  const trigramsOrdered = [];

  // Loop through the 'nospaces' string and count the occurrences of each trigram
  for (let i = 0; i < nospaces.length - 2; i++) {
    const trigram = nospaces.substr(i, 3);
    if (!trigramsOrdered.includes(trigram)) {
      trigramsOrdered.push(trigram);
      const count = countTrigrams(trigram, nospaces);
      countsOrdered.push(count);
    }
  }

  // Sort the trigrams and counts in descending order of frequency
  const sortedIndices = countsOrdered
    .map((_, index) => index)
    .sort((a, b) => countsOrdered[b] - countsOrdered[a]);
  const sortedTrigrams = sortedIndices.map((index) => trigramsOrdered[index]);
  const sortedCounts = sortedIndices.map((index) => countsOrdered[index]);

  const columns = 26; // Number of columns to display initially
  const numRows = Math.ceil(sortedTrigrams.length / columns); // Number of rows needed

  let tableHtml = `
<div class='container' style='margin-top: 20px'>
  <p>The frequencies of the trigrams are:</p>
  <div class="table-responsive">
    <table id="freqTable" class="table" style="width:auto;" border="1">
      <tr class="table-primary">
`;

  for (let i = 0; i < columns; i++) {
    tableHtml += `<col style="width:8%">`;
  }

  tableHtml += `
      </tr>
      <tr class="table-primary">
`;

  for (let i = 0; i < columns; i++) {
    if (sortedTrigrams[i]) {
      tableHtml += `<td style="text-align:center">${sortedTrigrams[i]}</td>`;
    } else {
      break;
    }
  }

  tableHtml += `
      </tr>
      <tr>
`;

  for (let i = 0; i < columns; i++) {
    if (sortedCounts[i]) {
      tableHtml += `<td style="text-align:center">${sortedCounts[i]}</td>`;
    } else {
      break;
    }
  }

  tableHtml += `
      </tr>
    </table>
  </div>
  <br>
</div>
`;

  if (numRows > 1) {
    for (let row = 1; row < numRows; row++) {
      tableHtml += `
    <div class='container' style='margin-top: 20px'>
      <div class="table-responsive">
        <table id="freqTable" class="table" style="width:auto;" border="1">
          <tr class="table-primary">
  `;

      const startIndex = row * columns;
      const endIndex = startIndex + columns;
      const remainingTrigrams = sortedTrigrams.slice(startIndex, endIndex);

      for (const _ of remainingTrigrams) {
        tableHtml += `<col style="width:8%">`;
      }

      tableHtml += `
          </tr>
          <tr class="table-primary">
  `;

      for (const trigram of remainingTrigrams) {
        if (trigram) {
          tableHtml += `<td style="text-align:center">${trigram}</td>`;
        } else {
          break;
        }
      }

      tableHtml += `
          </tr>
          <tr>
  `;

      for (let i = startIndex; i < endIndex; i++) {
        if (sortedCounts[i]) {
          tableHtml += `<td style="text-align:center">${sortedCounts[i]}</td>`;
        } else {
          break;
        }
      }

      tableHtml += `
          </tr>
        </table>
      </div>
      <br>
    </div>
  `;
    }
  }

  document.getElementById("wrapper3").innerHTML = tableHtml;
}

// Function to count the occurrences of a specific trigram in a string
function countTrigrams(trigram, string) {
  let count = 0;
  let index = -1;
  while ((index = string.indexOf(trigram, index + 1)) !== -1) {
    count++;
  }
  return count;
}

// Function to toggle the display of the substitution form
function toggleSubstitutionForm() {
  const substitutionForm = document.getElementById("substitutionForm");
  if (substitutionForm.style.display === "none") {
    substitutionForm.style.display = "block";
  } else {
    substitutionForm.style.display = "none";
  }
}

// Function to perform substitution based on user input
function performSubstitution() {
  const substitutionFrom = document
    .getElementById("substitutionFrom")
    .value.toUpperCase();
  const substitutionTo = document
    .getElementById("substitutionTo")
    .value.toUpperCase();
  const ciphertext = document.getElementById("ciphertext").value;

  const regex = new RegExp(substitutionFrom, "g");
  const substitutedText = ciphertext.replace(
    regex,
    substitutionTo.toLowerCase()
  );

  document.getElementById("ciphertext").value = substitutedText;
}
