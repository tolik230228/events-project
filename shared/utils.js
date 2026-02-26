import { domElements, state } from "./constants.js";

export const renderSkeletons = () => {
  domElements.eventsGrid.innerHTML = "";

  domElements.eventsGrid.innerHTML = Array(state.size)
    .fill(0)
    .map(
      () => `
    <div class="skeleton">
  <div class="skeleton-img"></div>
  <div class="skeleton-text"></div>
  <div class="skeleton-text" style="width: 50%;"></div>
</div>
  `,
    )
    .join("");
};
