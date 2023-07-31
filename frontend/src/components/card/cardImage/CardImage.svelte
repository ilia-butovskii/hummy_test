<script lang="ts">
  import { CoffeeImagesHttpService } from "../../../services/http/coffeeImages/CoffeeImagesHttpsService";
  import CardImagePlaceholder from "./CardImagePlaceholder.svelte";

  export let id = "";

  const coffeeImagesHttpService = new CoffeeImagesHttpService();

  let imageSrc = "";

  $: {
    if (id) {
      initImageSrc();
    }
  }

  const initImageSrc = async () => {
    const response = await coffeeImagesHttpService.getImageById(id);

    imageSrc = response.src;
  };
</script>

<div>
  {#if imageSrc}
    <img src={imageSrc} alt="alt" />
  {:else}
    <CardImagePlaceholder />
  {/if}
</div>

<style>
  img {
    width: 250px;
  }
</style>
