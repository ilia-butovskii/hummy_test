<script lang="ts">
  import CardNotesListItem from "./CardNotesListItem.svelte";

  export let notes: string[] = [];

  const tagColorsArray = [
    "#FF5733",
    "#66CC99",
    "#9933CC",
    "#FF9900",
    "#3399FF",
    "#FF33CC",
    "#00CC66",
    "#FF3366",
    "#CCFF33",
    "#6633FF",
  ];
</script>

<div class="tags-container">
  <span>Tags: </span>

  {#each notes as note, index}
    <CardNotesListItem {note} tagColor={tagColorsArray[index % 10]} />
  {/each}
</div>

<style>
  .tags-container {
    overflow-x: auto;
    white-space: nowrap;
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
