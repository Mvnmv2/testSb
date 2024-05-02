<script lang="ts">
    import {onMount} from 'svelte';

    let cost = {};

    let rubCostSer;
    let usdCostSer;

    $: usdCost = usdCostSer;
    $: rubCost = rubCostSer;

    onMount(async () => {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/aa9a46934a1dbddfc7b87358/latest/USD`);

        if (res.ok) {
            cost = await res.json();
            usdCostSer = +(cost.conversion_rates.USD).toFixed(2);
            rubCostSer = +(cost.conversion_rates.RUB).toFixed(2);
        } else {
            alert("Ошибка HTTP: " + res.status);
        }
    })

    function changeValueUSD(value) {
        rubCost = +(rubCostSer * (value - usdCostSer) + rubCostSer).toFixed(2)
    }

    function changeValueRUB(value) {
        usdCost = +((value / rubCostSer)).toFixed(4)
    }

</script>

<h1>Конвертер валют</h1>

<label for="USD" class="form-label">USD</label>
<input itemid="rub" bind:value={usdCost} id="USD" on:input={(e) => changeValueUSD(e.target.value)} type="number" min="0.01 "
       step="0.01" class="form-control shadow-none"
/>

<label for="RUB" class="form-label">RUB</label>
<input bind:value={rubCost} id="RUB" on:input={(e) => changeValueRUB(e.target.value)} type="number" min="0.01"
       step="0.01"
       class="form-control shadow-none"/>




