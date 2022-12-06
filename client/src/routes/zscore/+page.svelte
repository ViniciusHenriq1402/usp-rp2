<script>
  export let data;
  console.log(data);
  let ufs = data;
</script>

<h1 class="text-2xl font-bold">UF's: Z-Score</h1>
<br />
<p>Esta é a tabela onde temos o z-score, de cada estado brasileiro.</p>
<div />
<table class="styled-table">
  <thead>
    <tr>
      <th>Uf</th>
      <th>Z-score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        {ufs[0].sigla_uf}
      </td>
      <td>
        {ufs[0].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[1].sigla_uf}
      </td>
      <td>
        {ufs[1].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[2].sigla_uf}
      </td>
      <td>
        {ufs[2].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[3].sigla_uf}
      </td>
      <td>
        {ufs[3].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[4].sigla_uf}
      </td>
      <td>
        {ufs[4].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[5].sigla_uf}
      </td>
      <td>
        {ufs[5].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[6].sigla_uf}
      </td>
      <td>
        {ufs[6].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[7].sigla_uf}
      </td>
      <td>
        {ufs[7].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[8].sigla_uf}
      </td>
      <td>
        {ufs[8].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[9].sigla_uf}
      </td>
      <td>
        {ufs[9].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[10].sigla_uf}
      </td>
      <td>
        {ufs[10].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[11].sigla_uf}
      </td>
      <td>
        {ufs[11].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[12].sigla_uf}
      </td>
      <td>
        {ufs[12].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[13].sigla_uf}
      </td>
      <td>
        {ufs[13].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[14].sigla_uf}
      </td>
      <td>
        {ufs[14].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[15].sigla_uf}
      </td>
      <td>
        {ufs[15].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[16].sigla_uf}
      </td>
      <td>
        {ufs[16].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[17].sigla_uf}
      </td>
      <td>
        {ufs[17].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[18].sigla_uf}
      </td>
      <td>
        {ufs[18].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[19].sigla_uf}
      </td>
      <td>
        {ufs[19].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[20].sigla_uf}
      </td>
      <td>
        {ufs[20].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[21].sigla_uf}
      </td>
      <td>
        {ufs[21].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[22].sigla_uf}
      </td>
      <td>
        {ufs[22].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[23].sigla_uf}
      </td>
      <td>
        {ufs[23].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[24].sigla_uf}
      </td>
      <td>
        {ufs[24].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[25].sigla_uf}
      </td>
      <td>
        {ufs[25].z_score}
      </td>
    </tr>
    <tr>
      <td>
        {ufs[26].sigla_uf}
      </td>
      <td>
        {ufs[26].z_score}
      </td>
    </tr>

    <tr class="active-row" />
  </tbody>
</table>

<style>
  form {
    @apply flex flex-col gap-4 w-2/3 bg-zinc-50 shadow rounded-lg p-6;
  }

  label {
    @apply flex flex-col gap-2;
  }

  input,
  select {
    @apply border border-gray-300 rounded-md p-2;
  }

  .submit-btn {
    @apply bg-zinc-800
            text-zinc-50
            rounded
            p-2
            transition;
  }

  .submit-btn:hover {
    @apply bg-zinc-700
            text-zinc-50;
  }

  .chart--container {
    height: 100%;
    width: 100%;
    min-height: 530px;
  }

  .zc-ref {
    display: none;
  }

  .styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-family: sans-serif;
    min-width: 30vw;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }
  td {
    font-size: 16px;
    height: 20px;
    border-bottom: 1px solid rgb(208, 208, 208);
  }
  th {
    font-size: 20px;
    border-bottom: 1px solid rgb(208, 208, 208);
    text-align: start;
  }
</style>
