let array = [];
const arraySize = 15;

function generateArray() {
  array = [];
  for (let i = 0; i < arraySize; i++) {
    array.push(Math.floor(Math.random() * 100) + 10);
  }
  showArray();
}

function showArray(highlight = []) {
  const container = document.getElementById("array");
  container.innerHTML = "";
  array.forEach((val, idx) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = val * 3 + "px";
    if (highlight.includes(idx)) bar.style.background = "red";

    const num = document.createElement("span");
    num.innerText = val;
    bar.appendChild(num);

    container.appendChild(bar);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 🟢 Bubble Sort
async function bubbleSort() {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
      showArray([j, j + 1]);
      await sleep(150);
    }
  }
}

// 🟢 Selection Sort
async function selectionSort() {
  for (let i = 0; i < array.length; i++) {
    let min = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) min = j;
    }
    [array[i], array[min]] = [array[min], array[i]];
    showArray([i, min]);
    await sleep(150);
  }
}

// 🟢 Insertion Sort
async function insertionSort() {
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
      showArray([j, j + 1]);
      await sleep(150);
    }
    array[j + 1] = key;
  }
  showArray();
}

// 🟢 Quick Sort
async function quickSortHandler() {
  await quickSort(0, array.length - 1);
  showArray();
}

async function quickSort(low, high) {
  if (low < high) {
    let p = await partition(low, high);
    await quickSort(low, p - 1);
    await quickSort(p + 1, high);
  }
}

async function partition(low, high) {
  let pivot = array[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
    }
    showArray([j, high]);
    await sleep(150);
  }
  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  return i + 1;
}

// 🟢 Merge Sort
async function mergeSortHandler() {
  await mergeSort(0, array.length - 1);
  showArray();
}

async function mergeSort(left, right) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    await mergeSort(left, mid);
    await mergeSort(mid + 1, right);
    await merge(left, mid, right);
  }
}

async function merge(left, mid, right) {
  let n1 = mid - left + 1;
  let n2 = right - mid;
  let L = array.slice(left, mid + 1);
  let R = array.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      array[k] = L[i];
      i++;
    } else {
      array[k] = R[j];
      j++;
    }
    showArray([k]);
    await sleep(150);
    k++;
  }
  while (i < n1) {
    array[k++] = L[i++];
    showArray([k - 1]);
    await sleep(150);
  }
  while (j < n2) {
    array[k++] = R[j++];
    showArray([k - 1]);
    await sleep(150);
  }
}

generateArray();
