<template>
    <div id="app">
        <div class="template">
            <div class="template-preview">
                <div class="template-border">
                    <component :is="template1" :mainBgColor="selectedBgColor" :secondaryBgColor="secondaryBgColor"
                        :textColor="textColor" :logoSize="'120px'" :iconSize="IconSize" :layout="layout"
                        :logoUrl="logoUrl" :mediaUrl="mediaUrl" :fontSize="fontSize" :selectedLanguages="selectedLanguages"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Template1 from "./template1/template1.vue";
import "../../assets/css/views/templates/templateSettings.css";

export default {
    name: "TemplateSettingsComp",
    components: {
        Template1,
    },
    props: {
        template: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            selectedBgColor: "#505095",
            secondaryBgColor: "#fff",
            textColor: "#fff",
            layout: "three",
            mediaUrl: 'home_bg.jpg',
            logoUrl: 'logo_1000.png',
            IconSize: '120px',
            fontSize: '14px',
            template1: '',
            selectedLanguages:[]
        };
    },
    watch: {
        template: {
            handler(newData) {
                if (newData.length > 0) {
                    const template = newData[0];

                    this.template1 = template.name;
                    this.mediaUrl = template.banner;
                    this.logoUrl = template.logo;
                    this.IconSize = template.size;
                    this.layout = template.layout;

                    // Parse color array and assign values
                    const colors = JSON.parse(template.color);
                    colors.forEach(color => {
                        if (color.name === "selectedBgColor") {
                            this.selectedBgColor = color.value;
                        } else if (color.name === "secondaryBgColor") {
                            this.secondaryBgColor = color.value;
                        } else if (color.name === "textColor") {
                            this.textColor = color.value;
                        }
                    });

                    // Optional: Handle languages if needed
                    this.selectedLanguages = JSON.parse(template.languages);
                }
            },
            immediate: true
        }
    }
};
</script>