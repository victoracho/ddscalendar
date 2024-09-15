<?php
require_once(__DIR__ . '/crest.php');
$placement_options = json_encode($_REQUEST['PLACEMENT_OPTIONS'], true);
$deal = CRest::call(
  'crm.deal.get',
  [
    'ID' => $placement_options['ID']
  ]
);

$user = CRest::call(
  'user.current',
  [
    'auth' => $_REQUEST['AUTH_ID']
  ]
);

$lead = $lead['result'];
$user = $user['result'];

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <link rel="icon" href="/assets/calendar-204x192-qYKbn2HT.png">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
  <title>Calendar - Vue3</title>
  <meta name="description" content="This is a Vue 3 application that showcases usage of fullcalendar for tutorial purposes.">
  <meta name="keywords" content="vue, fullcalendar, tutorial, example, composition API">

  <meta property="og:title" content="Vue3 fullcalendar app">
  <meta property="og:site_name" content="Vue3 - fullcalendar app">
  <meta property="og:type" content="website">
  <meta property="og:description" content="This is a Vue 3 application that showcases usage of fullcalendar for tutorial purposes.">
  <meta property="og:image" content="https://raw.githubusercontent.com/YSHgroup/vue3-fullcalendar-bootstrap/main/src/assets/fullcalendar-first-page.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="600">
  <meta property="og:image:alt" content="Fullcalendar screen" />
  <meta property="og:url" content="https://yshgroup.github.io/vue3-fullcalendar-bootstrap/">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Vue3 - fullcalendar app">
  <meta name="twitter:description" content="This is a Vue 3 application that showcases usage of fullcalendar for tutorial purposes.">
  <meta name="twitter:image" content="https://raw.githubusercontent.com/YSHgroup/vue3-fullcalendar-bootstrap/main/src/assets/fullcalendar-first-page.png">

  <meta name="robots" content="index, follow">
  <link rel="image_src" href="https://raw.githubusercontent.com/YSHgroup/vue3-fullcalendar-bootstrap/main/src/assets/fullcalendar-first-page.png?format=1500w">
  <link rel="canonical" href="https://yshgroup.github.io/vue3-fullcalendar-bootstrap/">
  <script type="module" crossorigin src="assets/index-rVJbin32.js"></script>
  <link rel="stylesheet" crossorigin href="assets/index-4BPIo0TE.css">
  <script>
    var currentSize = BX24.getScrollSize();
    BX24.resizeWindow(currentSize.scrollWidth, currentSize.scrollHeight);
    var user = <?php echo json_encode($user); ?>
    var deal = <?php echo json_encode($deal); ?>
  </script>
</head>

<body>
  <div id="app"></div>
</body>

</html>
