<template>
    <div id="app">
        <h4>Settings</h4>
  
        <div class="mb-3" style="border: 1px solid #ddd;padding: 20px;max-width:600px;width: 100%;">
            <div>
                <h6>Button style view</h6>
                <div style="display: flex;gap: 30px;">
                    <div class="mb-3">
                        <span class="mb-2">Button Background</span>
                        <ColorPicker @color-changed="handleBgColorChange" />
                    </div>
                    <div>
                        <span class="mb-2">Text Color</span>
                        <ColorPicker @color-changed="handleTxtColorChange" />
                    </div>
                </div>
            </div>
            <div>
                <h6>Menu style view</h6>
                <div style="display: flex;gap: 30px;">
                    <div class="mb-3">
                        <span class="mb-2">Button Background</span>
                        <ColorPicker @color-changed="handleMenuBgColorChange" />
                    </div>
                    <div>
                        <span class="mb-2">Text Color</span>
                        <ColorPicker @color-changed="handleMenuTxtColorChange" />
                    </div>
                </div>
            </div>


            <DynamicButton width="100px" height="40px" :backgroundColor=selectedBgColor :textColor=selectedTxtColor
                fontSize="14px" @click="handleButtonClick">
                Click Me!
            </DynamicButton>
        </div>
        <div style="border: 1px solid #ddd;padding: 20px;max-width:600px;width: 100%;">
            <div class="mb-3">
                <h6>Calorie options</h6>
                <select class="form-select" aria-label="Default select example">
                    <option value="1">cal</option>
                    <option value="2">kcal</option>

                </select>
            </div>
            <div class="mb-3">
                <h6>Content / Allergen Warnings</h6>
                <div class="d-flex">
                    <span>Show content warning labels</span>
                    <div class="form-check form-switch ms-3">
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                        <label class="form-check-label" for="flexSwitchCheckDefault"></label>
                    </div>
                </div>

            </div>
            <hr/>
            <div class="d-flex justify-content-end">
                <button class="btn btn-success">Kaydet</button>
            </div>
        </div>
    </div>
</template>

<script>
import ColorPicker from '../components/ColorPickerComp.vue';
import DynamicButton from '../components/ButtonComp.vue';
export default {
    name: 'SettingsComp',
    components: {
        ColorPicker,
        DynamicButton,
    },
    data() {
        return {
            selectedMenuBgColor: '#000',
            selectedMenuTxtColor:'#fff',
            selectedBgColor: '#000000',
            selectedTxtColor: '#fff'
        };
    },
    methods: {
        handleMenuBgColorChange(newColor) {
            this.selectedMenuBgColor = newColor;
        },
        handleMenuTxtColorChange(newColor) {
            this.selectedMenuTxtColor = newColor;
        },
        handleBgColorChange(newColor) {
            this.selectedBgColor = newColor;
        },
        handleTxtColorChange(newColor) {
            this.selectedTxtColor = newColor;
        },
    },
};
</script>

<style>
.color-display {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    color: #fff;
    font-size: 1.2em;
    border: 1px solid #ddd;
}
</style>