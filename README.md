# Docksal powered Drupal 10.2.4 With Composer Installation and using Drush ^12

This is a sample Drupal 10 with Composer installation pre-configured for use with Docksal.

Features:

- Drupal 10.2.4 Composer Project
- Drush 12.4.4.0 
- `fin init` [example](.docksal/commands/init)
- Using the [default](.docksal/docksal.env#L9) Docksal LAMP stack with [image version pinning](.docksal/docksal.env#L13-L15)
- PHP and MySQL settings overrides [examples](.docksal/etc)

## Setup instructions

### Step #1: Docksal environment setup

**This is a one time setup - skip this if you already have a working Docksal environment.**

Follow [Docksal environment setup instructions](https://docs.docksal.io/getting-started/setup/)

### Step #2: Project setup

1. Clone this repo into your Projects directory

    ```
    git clone https://github.com/Cochasoft/tienda-de-ropas.git drupal-taller
    cd drupal-taller
    ```

2. Initialize the site

   This will initialize local settings and install the site via drush

    ```
    fin init
    ```
   A `composer.lock` file will be generated. This file should be committed to your repository.

3. Point your browser to

    ```
    http://drupal-taller.docksal.site/
    ```

When the automated install is complete, the command line output will display the admin username and password.


## More automation with 'fin init'

Site provisioning can be automated using `fin init`, which calls the shell script in [.docksal/commands/init](.docksal/commands/init).
This script is meant to be modified per project. The one in this repo will give you a good starting example.

Some common tasks that can be handled by the init script (and other [custom commands](https://docs.docksal.io/fin/custom-commands/)):

- initialize local settings files for Docker Compose, Drupal, Behat, etc.
- import DB or perform a site install
- compile Sass
- run DB updates, revert features, clear caches, etc.
- enable/disable modules, update variables values


## Port change :8080 to 8081 
If you want to change the default port :8080 but you have apache LAMP and do not want to turn off you can change the port with the following command we will use the port :8081

Documentation => https://blog.docksal.io/how-to-override-default-http-and-https-ports-in-docksal-f4d5a96fced4

- Command using `fin`.
```
fin config set --global DOCKSAL_VHOST_PROXY_PORT_HTTP=8081
```
```
fin system reset
```

## Additional changes
- Command using `nano .docksal/commands/init-site` add port :8081
```
echo -e "Open ${yellow}http://${VIRTUAL_HOST}${NC}:8081 in your browser to verify the setup."
```
## Optional MySQL port changes
- Command using `nano .docksal/docksal.env` change port `MYSQL_PORT_MAPPING='0:3307'`


## Security notice

This repo is intended for quick start demos and includes a hardcoded value for `hash_salt` in `settings.php`.
If you are basing your project code base on this repo, make sure you regenerate and update the `hash_salt` value.
A new value can be generated with `drush ev '$hash = Drupal\Component\Utility\Crypt::randomBytesBase64(55); print $hash . "\n";'`


# Installation in xampp

## Previous requirements

- XAMPP installed and configured on your system.
- Basic knowledge of Drupal and PHP 8.1
- Composer

1. Clone this repo into your Projects directory

    ```
    git clone https://github.com/Cochasoft/tienda-de-ropas.git drupal-taller
    cd drupal-taller
    ```
2. In the console execute the following commands.
    ```
    composer install
    ```
    ```
    vendor/bin/drush sql-dump > db/drupal-taller.sql
    ```
3. In your browser go to the following route.

http://localhost/drupal-taller/web
