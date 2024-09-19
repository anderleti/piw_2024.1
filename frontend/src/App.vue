<script setup lang="ts">

</script>

<template>

    <div id="nav-bar-container">
            <nav id="nav-bar">

                    <ul id="portfolio-links">
                        <li>
                            <a href="/artworks">Portifolio</a>
                        </li>

                        <li>
                            <a href="/about">Os Artistas</a>
                        </li>

                    </ul>

                    <ul id="user-details">

                        <li>
                            <a class="user-profile-link">
                                <div class="user-profile-img">
                                    <img/>
                                </div>
                            </a>
                        </li>

                    </ul>

            </nav>
        </div>

    <RouterView></RouterView>

</template>

<style scoped>

</style>
