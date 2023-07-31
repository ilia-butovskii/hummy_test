<script lang="ts">
  export let note = "";
  export let tagColor = "";
</script>

<div class="note" style="background-color: {tagColor};">
  <span>{note}</span>
</div>

<style>
  .note {
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-right: 5px;
  }

  span {
    color: #333;
    text-align: center;
    padding: 5px;
    font-size: 16px;
    margin: 10px 0;
  }
</style>
