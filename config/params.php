<?php

define('PATH_TO_RESOURCE', '/var/www/html/store/resource');
return [
    'sitename' => "Store",
    'contact' => '980000000',
    'address' => 'Kathmandu, Nepal',
    'adminEmail' => 'admin@example.com',
    'emailhost' => 'smtp.gmail.com',
    'emailuser' => 'tukidemo@gmail.com',
    'emailpassword' => 'knixpqcpxaflxgnu',
    'sitemail' => 'tukidemo@gmail.com',
    'aliases' => [
        '@images' => realpath(dirname(__FILE__) . '/../../web/images'),
    ],
];
