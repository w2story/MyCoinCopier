<script>
  import { TimePickerModal } from "svelte-time-picker"; // the modal including the TimePicker component
  import { fade } from "svelte/transition";
  import { totoTime } from "~/store/totoTime";

  export let showModal; // binded by the App

  /* Callbacks */
  let cancelCallback = (event) => {
    //totoTime.set(event.detail);
  };
  let changeCallback = (event) => {
    totoTime.set(event.detail);
  };
  let okCallback = (event) => {
    //totoTime.set(event.detail);
  };

  function close() {
    showModal = false;
  }

  let options = {
    bgColor: "#ff4081",
    zIndex: 200,
  };
</script>

<div transition:fade={{ duration: 300 }}>
  <TimePickerModal
    {options}
    on:cancel={cancelCallback}
    on:change={changeCallback}
    on:ok={okCallback}
    on:close={close}
  />
</div>
