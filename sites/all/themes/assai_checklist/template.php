<?php

/**
 * @file
 * Preprocess e assets do tema Assaí Checklist.
 */

/**
 * Adiciona Google Fonts no <head>.
 */
function assai_checklist_preprocess_html(&$variables) {
  drupal_add_css(
    'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,200;9..40,400;9..40,500;9..40,700;9..40,800&family=Montserrat:wght@500;700;800;900&display=swap',
    array('type' => 'external')
  );
}

/**
 * Injeta jsPDF e configurações para o app.js.
 */
function assai_checklist_preprocess_page(&$variables) {
  $path = drupal_get_path('theme', 'assai_checklist');

  drupal_add_js(
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
    array('type' => 'external', 'scope' => 'header')
  );

  $theme_path = base_path() . $path . '/';
  $debug = isset($_GET['track_debug']) && $_GET['track_debug'] === '1';
  drupal_add_js(array(
    'assaiChecklist' => array(
      'base' => $theme_path,
      'trackUrl' => $theme_path . 'track/track.php',
      'debug' => $debug,
    ),
  ), 'setting');

  /* Scripts no footer, após Drupal.settings (weight > 0) */
  drupal_add_js($path . '/js/data.js', array('scope' => 'footer', 'weight' => 50));
  drupal_add_js($path . '/js/app.js', array('scope' => 'footer', 'weight' => 51));
}
