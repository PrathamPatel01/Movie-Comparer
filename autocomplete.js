const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>
  `;

  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  const onInput = async (event) => {
    const items = await fetchData(event.target.value);

    // removing the empty response in the  dropdown
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    // for next consecutive search and error handling
    resultsWrapper.innerHTML = "";
    dropdown.classList.add("is-active");
    for (let item of items) {
      const option = document.createElement("a");

      // when no poster is available

      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);

      // selecting movie from the dropdown
      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(item);
        onOptionSelect(item);
      });

      resultsWrapper.appendChild(option);
    }
    // console.log(movies);
  };
  input.addEventListener("input", debounce(onInput, 500));

  // global event listener
  document.addEventListener("click", (event) => {
    //  closing dropdown if clicked outside the dropdown or any where on the screen
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
