<script lang="ts">
  import type { ICoffeeCardResponse } from "../../services/http/coffeeCards/types";
  import CardImage from "./cardImage/CardImage.svelte";
  import CardNotesList from "./cardNotes/CardNotesList.svelte";

  export let cardData: ICoffeeCardResponse;
</script>

<div class="card-container">
  <h1>{cardData.blendName}</h1>

  <CardImage id={cardData.image} />
  <CardNotesList notes={cardData.notes} />

  <p>Origin: {cardData.origin}</p>
  <p>Variety: {cardData.variety}</p>
  <p>Intensifier: {cardData.intensifier}</p>
</div>

<style>
  .card-container {
    width: 400px;
    border: 1px solid #ccc;
    background-color: #cccccc1a;
    margin-bottom: 10px;
  }
</style>
