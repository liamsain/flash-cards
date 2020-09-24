<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let flipped = false;
  let editMode = false;
  export let value;

  function onUpdate() {
    editMode = false;
    dispatch("update", value);
  }
  function onRemove() {
    dispatch("remove", value);
  }
  function onCardClick() {
    flipped = !flipped;
    editMode = false;
  }
</script>

<style>
  .flip-card {
    background-color: transparent;
    width: 300px;
    height: 300px;
    perspective: 1000px;
    margin: 12px;
    cursor: pointer;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  .rotate .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    font-weight: 600;
    font-size: 19px;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .flip-card-front {
    color: white;
    background-color: #92c0e4;
  }

  .flip-card-back {
    background-color: #a2caa7;
    color: white;
    transform: rotateY(180deg);
  }
  .flip-card-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
  }
</style>

<div
  class="flip-card"
  on:click={() => onCardClick()}
  class:rotate={flipped}>
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <div class="flip-card-content" style="padding: 20px;">
        {#if editMode}
          <textarea bind:value={value.question} on:click|stopPropagation />
          <button on:click|stopPropagation={() => onUpdate()}>Save</button>
        {/if}
        {#if !editMode}
          <p>{value.question}</p>
          <div>
            <button
              on:click|stopPropagation={() => (editMode = true)}>Edit</button>

            <button on:click|stopPropagation={() => onRemove()}>Delete</button>
          </div>
        {/if}
      </div>
    </div>
    <div class="flip-card-back">
      <div class="flip-card-content" style="padding: 20px;">
        {#if editMode}
          <textarea bind:value={value.answer} on:click|stopPropagation />
          <div>
            <button on:click|stopPropagation={() => onUpdate()}>Save</button>
          </div>
        {/if}
        {#if !editMode}
          <p>{value.answer}</p>
          <div>
            <button
              on:click|stopPropagation={() => (editMode = true)}>Edit</button>

            <button on:click|stopPropagation={() => onRemove()}>Delete</button>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
