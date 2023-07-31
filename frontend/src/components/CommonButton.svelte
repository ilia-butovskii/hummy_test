<script lang="ts">
  export let title = "";
  export let onClick;
  export let isDisabled: boolean;

  let computedClass = "button";

  const computeButtonClass = (isDisabled) => {
    if (isDisabled) {
      computedClass = "disabled-button";

      return;
    }

    computedClass = "button";
  };

  const onClickHandler = () => {
    if (!isDisabled) {
      onClick();
    }
  };

  $: {
    computeButtonClass(isDisabled);
  }
</script>

<div class={computedClass} on:click={onClickHandler}>
  {title}
</div>

<style>
  .button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #f0f0f0;
    color: #333;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .button:hover {
    background-color: #ddd;
    color: #555;
  }

  .disabled-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #5f5f5f;
    color: #333;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
</style>
