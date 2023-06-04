const ACTIVE_MENU_CLASS = "active";

function handleMenuClick(event: PointerEvent) {
  event.preventDefault();

  const nav = document.getElementById("nav");
  const button = event.currentTarget;
  if (!(button instanceof HTMLElement) || !nav) return;

  const isActiveNow = nav?.classList.contains(ACTIVE_MENU_CLASS);
  if (isActiveNow) {
    nav.classList.remove(ACTIVE_MENU_CLASS);
    button.ariaExpanded = "false";
    button.ariaLabel = "Abrir menu";
  } else {
    nav.classList.add(ACTIVE_MENU_CLASS);
    button.ariaExpanded = "true";
    button.ariaLabel = "Fechar menu";
  }
}

const mobileMenuButton = document.querySelector("#btn-mobile");
mobileMenuButton?.addEventListener("pointerdown", handleMenuClick);
