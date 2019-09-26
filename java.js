"use strict";

const link = "https://frontendseptember-f268.restdb.io/rest/humans";
const key = "5d887447fd86cb75861e25f9";

window.addEventListener("DOMContentLoaded", get);

const form = document.querySelector("form");
document.querySelector("input[type=submit]").addEventListener("click", post);

function get() {
  fetch(link, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": key,
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(data => display(data));
}

function display(people) {
  console.log(people);
  people.forEach(person => {
    const template = document.querySelector("template").content;
    const clone = template.cloneNode(true);
    const parent = document.querySelector("ul.peopleList");
    clone.querySelector("h3.name").textContent = "Name: " + person.name;
    clone.querySelector("h3.gender").textContent = "Gender: " + person.gender;
    clone.querySelector("img.icon").src = person.gender + ".png";
    clone.querySelector("img.icon").alt = person.gender;
    clone.querySelector("h3.profession").textContent =
      "Profession: " + person.profession;
    if (person.age >= 10 && person.age <= 19) {
      clone.querySelector("h3.age").textContent =
        "Age: " + person.age + " years old";
    } else if (person.age.toString().includes("1")) {
      clone.querySelector("h3.age").textContent =
        "Age: " + person.age + " year old";
    } else {
      clone.querySelector("h3.age").textContent =
        "Age: " + person.age + " years old";
    }

    clone.querySelector("button.delete").addEventListener("click", () => {
      deleted(person._id);
    });
    clone.querySelector("li").dataset.personid = person._id;
    parent.appendChild(clone);
  });
}

function deleted(id) {
  console.log(id);
}

function post() {
  const newPerson = {
    age: "",
    gender: "",
    name: "",
    profession: ""
  };

  newPerson.age = form.elements.age.value;
  newPerson.gender = form.elements.gender.value;
  newPerson.name = form.elements.name.value;
  newPerson.profession = form.elements.profession.value;

  const jsonPerson = JSON.stringify(newPerson);

  fetch(link, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": key,
      "cache-control": "no-cache"
    },
    body: jsonPerson
  })
    .then(res => res.json())
    .then(data => console.log(data));
  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);
  const parent = document.querySelector("ul.peopleList");
  clone.querySelector("h3.name").textContent = "Name: " + newPerson.name;
  clone.querySelector("h3.gender").textContent = "Gender: " + newPerson.gender;
  clone.querySelector("img.icon").src = newPerson.gender + ".png";
  clone.querySelector("img.icon").alt = newPerson.gender;
  clone.querySelector("h3.profession").textContent =
    "Profession: " + newPerson.profession;
  if (newPerson.age >= 10 && newPerson.age <= 19) {
    clone.querySelector("h3.age").textContent =
      "Age: " + newPerson.age + " years old";
  } else if (newPerson.age.toString().includes("1")) {
    clone.querySelector("h3.age").textContent =
      "Age: " + newPerson.age + " year old";
  } else {
    clone.querySelector("h3.age").textContent =
      "Age: " + newPerson.age + " years old";
  }

  // clone.querySelector("button.delete").addEventListener("click", () => {
  //   deleted(newPerson._id);
  // });
  //clone.querySelector("li").dataset.personid = newPerson._id;
  parent.prepend(clone);
}
