// DOM function
const one = ele => document.querySelector(ele);
const all = ele => document.querySelectorAll(ele);
// create가 없었다면.. 굉장히 더러운 코드가 되었을 것입니다.
const create = (name, attr) => {
  const ele = document.createElement(name);
  for (const k in attr) {
    const v = attr[k];
    switch (k) {
      case "html":
        ele.innerHTML = v;
        break;
      case "event":
        for (const e in v) ele.addEventListener(e, v[e]);
        break;
      default:
        ele.setAttribute(k, v);
        break;
    }
  }
  return ele;
};

// variable
const folderAddBtn = one(".folder-add");
const folderInput = one(".folder-input");
const folderList = one(".folder-list");
const taskList = one(".task-list");
let folderDataList = [
  /* 생략. 사실 초기 데이터는 별로 중요하지 않아요.*/
];

const addFolder = e => {
  if (e.keyCode === 13) {
    const newFolder = folderDataList.push({ name: e.target.value, child: [] });
    e.target.value = "";
    e.target.focus;
    folderRender();
  }
};

const folderRender = () => {
  folderList.innerHTML = "";
  const ul = create("ul");
  folderDataList.forEach(v => {
    ul.appendChild(
      create("li", { html: v.name, event: { click: taskRender(v) } })
    );
  });
  folderList.appendChild(ul);
};

const taskRender = data => e => {
  const title = create("h3", { html: data.name });
  const ul = create("ul");
  const input = create("input", {
    class: "task-input",
    size: 20,
    placeholder: "task 입력",
    event: {
      keyup: inputEvent => {
        if (inputEvent.keyCode === 13) {
          data.child.push({ name: inputEvent.target.value, state: false });
          e.target.click();
          inputEvent.target.focus();
        }
      }
    }
  });
  const close = create("button", {
    type: "button",
    html: "닫기",
    event: { click: e => (taskList.innerHTML = "") }
  });
  data.child.forEach(ele => ul.appendChild(taskChildRender(ele)));
  taskList.innerHTML = "";
  for (const ele of [title, input, ul, close]) taskList.appendChild(ele);
};

const taskChildRender = v =>
  create("li", {
    html: v.name,
    style: v.state ? "color:#09F" : "",
    event: {
      click: e => {
        e.target.style.color = (v.state = !v.state) ? "#09F" : "";
      }
    }
  });

window.onload = () => {
  folderInput.onkeyup = addFolder;
  folderRender();
};
