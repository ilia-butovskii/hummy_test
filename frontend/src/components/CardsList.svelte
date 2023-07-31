<script lang="ts">
  import type { ICoffeeCardResponse } from "../services/http/coffeeCards/types";
  import Card from "./card/Card.svelte";
  import { coffeeCardsStore } from "../store/coffeeCardsStore";
  import { onDestroy } from "svelte";
  import CommonButton from "./CommonButton.svelte";

  let cards: ICoffeeCardResponse[] = [];
  let isNewCardLoading: boolean = false;

  const coffeeCardStoreUnsubscribe = coffeeCardsStore.subscribe(
    (storeCards) => (cards = storeCards)
  );
  const loadingStateUnsubscribe = coffeeCardsStore.loadingStateSubscribe(
    (state) => (isNewCardLoading = state)
  );

  const addNewCardHandler = async () => {
    await coffeeCardsStore.addNewCard();
  };

  const onDestroyHandler = () => {
    coffeeCardStoreUnsubscribe();
    loadingStateUnsubscribe();
  };

  onDestroy(onDestroyHandler);
</script>

<div>
  {#each cards as card}
    <Card cardData={card} />
  {/each}

  <CommonButton
    title="Add new card"
    onClick={addNewCardHandler}
    bind:isDisabled={isNewCardLoading}
  />
</div>
