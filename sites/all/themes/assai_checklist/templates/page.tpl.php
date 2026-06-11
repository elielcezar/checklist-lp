<?php

/**
 * @file
 * Template da landing page do Guia do Comerciante Campeão.
 */
$theme = base_path() . path_to_theme();
?>
<?php if ($messages): ?>
  <div class="messages-wrapper"><?php print $messages; ?></div>
<?php endif; ?>

<div class="stage">

  <!-- ============ HERO ============ -->
  <header class="hero">
    <img class="hero__logo" src="<?php print $theme; ?>/images/logo-assai.png" alt="Assaí Atacadista" width="190" height="190" />

    <img class="hero__banner hero__banner-mob" src="<?php print $theme; ?>/images/banner-top-mob.png" alt="Não perca mais vendas e abasteça seu negócio com a lista certa!" />
    <img class="hero__banner hero__banner-desk" src="<?php print $theme; ?>/images/banner-top-desk.png" alt="Não perca mais vendas e abasteça seu negócio com a lista certa!" />

    <div class="hero__title" aria-label="Guia Prático do Comerciante Campeão">
      <img src="<?php print $theme; ?>/images/h1.png" alt="Guia Prático do Comerciante Campeão" />
    </div>

    <p class="hero__subtitle">Um Guia Prático de Compras para o seu Negócio</p>

    <ol class="steps">
      <li class="step step--1"><span class="step__num">1</span><span class="step__text">Escolha a categoria do seu negócio</span></li>
      <li class="step step--2"><span class="step__num">2</span><span class="step__text">Selecione os produtos</span></li>
      <li class="step step--3"><span class="step__num">3</span><span class="step__text">Baixe a sua lista personalizada</span></li>
      <li class="step step--4"><span class="step__num">4</span><span class="step__text">Corra pro Assaí mais perto de você</span></li>
    </ol>
  </header>

  <!-- ============ CATEGORIAS (render via JS) ============ -->
  <main class="categories" id="categories"></main>

  <!-- ============ FOOTER ============ -->
  <footer class="footer">
    <img class="footer__logo" src="<?php print $theme; ?>/images/logo-assai.png" alt="Assaí Atacadista" width="190" height="190" />
  </footer>

</div>
