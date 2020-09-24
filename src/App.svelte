<script>
  import FlipCard from "./FlipCard.svelte";
  import FlipCardModel from "./FlipCard.js";
  import CardCollectionModel from "./CardCollection.js";
  const localStorageKey = "flash-cards";

  let activeCollection;
  let addingCollection = false;
  let collectionName = "";
  let cardCollections = getCollectionsFromStore();

  function getCollectionsFromStore() {
    const cardsStr = localStorage.getItem(localStorageKey);
    if (cardsStr) {
      return JSON.parse(cardsStr).map((x) => new CardCollectionModel({ ...x }));
    }
    return [];
  }

  function saveCardCollectionsToStore(collections) {
    localStorage.setItem(localStorageKey, JSON.stringify(collections));
  }

  function updateCollectionInStore(collection) {
    const collections = getCollectionsFromStore();
    let collectionIndexToUpdate = collections.findIndex(
      (x) => x.id === collection.id
    );
    if (collectionIndexToUpdate !== -1) {
      collections[collectionIndexToUpdate] = new CardCollectionModel(
        collection
      );
    } else {
      collections.push(collection);
    }
    saveCardCollectionsToStore(collections);
  }

  function removeCollectionFromStore(collection) {
    let collections = getCollectionsFromStore();
    collections = collections.filter((x) => x.id !== collection.id);
    saveCardCollectionsToStore(collections);
  }

  function onAddCard() {
    const card = new FlipCardModel();
    activeCollection.cards = [...activeCollection.cards, card];
    updateCollectionInStore(activeCollection);
  }

  function onCardUpdate(card) {
    const index = activeCollection.cards.find((x) => x.id === card.detail.id);
    activeCollection.cards[index] = new FlipCardModel(card.detail);
    updateCollectionInStore(activeCollection);
  }

  function onCardRemove(card) {
    activeCollection.cards = activeCollection.cards.filter(
      (x) => x.id !== card.id
    );
    updateCollectionInStore(activeCollection);
  }

  function onAddCollection() {
    if (collectionName.trim().length < 1) {
      alert("collection must have a name");
      return;
    }
    activeCollection = new CardCollectionModel({ name: collectionName });
    updateCollectionInStore(activeCollection);
    cardCollections = getCollectionsFromStore();
    addingCollection = false;
    collectionName = "";
  }
</script>

<style>
  .flip-card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  main {
    display: grid;
    grid-template-columns: minmax(150px, 10%) 1fr;
  }
  .collection-name {
    cursor: pointer;
  }
</style>

<main>
  <div style="margin-left: 24px;">
    <h2>Collections</h2>
    {#each cardCollections as collection}
      <p
        class="collection-name"
        on:click={() => (activeCollection = collection)}>
        {collection.name}
      </p>
    {/each}
    <button on:click={() => (addingCollection = true)}>Add collection</button>
    {#if addingCollection}
      <input bind:value={collectionName} placeholder="Name of collection" />
      <button on:click={onAddCollection}>Save</button>
    {/if}
  </div>
  <div>
    {#if activeCollection}
      <div style="display: flex;">
        <button on:click={onAddCard}>Add card</button>
        <h2 style="margin-left: 40px;">{activeCollection.name}</h2>
      </div>
      <div class="flip-card-container">
        {#each activeCollection.cards as value}
          <FlipCard
            bind:value
            on:update={onCardUpdate}
            on:remove={onCardRemove} />
        {/each}
      </div>
    {/if}
  </div>
</main>
