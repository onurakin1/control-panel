<template>
    <div class="container mt-4">

        <div class="d-flex justify-content-end mb-3 mt-3">
            <button class="btn btn-primary" @click="addBranch" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Add New Branch</button>
        </div>

        <!-- <div class="file-upload" @drop.prevent="handleDrop" @dragover.prevent @dragleave.prevent>
            <input type="file" ref="fileInput" @change="handleFileChange" accept=".xlsx, .xls" class="hidden" />
            <div class="upload-area" @click="triggerFileInput">
                <p>Drag & Drop or Click to Browse Excel Files</p>
            </div>
            <div v-if="fileName">
                <h3>Selected File: {{ fileName }}</h3>
                <button @click="submitFile" class="submit-btn">Submit</button>
            </div>
            <p v-if="uploadStatus">{{ uploadStatus }}</p>
        </div> -->



        <div class="row">
            <div class="col-12 mb-4" v-for="branch in groupBranches" :key="branch.branch_id">
                <div class="card h-100">
                    <div class="card-body d-flex justify-content-between">
                        <h5 class="card-title">{{ branch.branch_name }}</h5>
                        <div>
                            <i class="bi bi-view-stacked me-2 pe-auto cursor-pointer" @click="goToCategory(branch)"></i>
                            <i class="bi bi-pencil-square me-2 pe-auto cursor-pointer" @click="editBranch(branch)"
                                data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight"></i>
                            <i class="bi bi-trash3 pe-auto cursor-pointer" @click="deleteBranch(branch.branch_id)"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!groupBranches.length" class="col-12">
            Loading...
        </div>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <h5 id="offcanvasRightLabel">{{ editMode ? 'Edit Branch' : 'Add Branch' }}</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <form @submit.prevent="saveBranch">
                    <div class="mb-3">
                        <label for="branchName" class="form-label">Branch Name</label>
                        <input type="text" class="form-control" id="branchName" v-model="form.branch_name" required>
                    </div>
                    <div class="mb-3">
                        <label for="city" class="form-label">Branch City</label>
                        <input type="text" class="form-control" id="branch_city" v-model="form.branch_city" required>
                    </div>
                    <div class="mb-3">
                        <label for="adress" class="form-label">Branch Adress</label>
                        <input type="text" class="form-control" id="branch_adress" v-model="form.branch_address"
                            required>
                    </div>
                    <div class="mb-3">
                        <label for="adress" class="form-label">Branch Phone</label>
                        <div class="input-group">
                            <div class="dropdown">
                                <button class="btn btn-outline-secondary dropdown-toggle" type="button"
                                    id="countryDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span :class="`flag-icon flag-icon-${selectedCountry.flag} me-2`"></span> {{
                                        selectedCountry.code }}
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="countryDropdown">
                                    <li v-for="country in countries" :key="country.code" @click="selectCountry(country)"
                                        class="dropdown-item">
                                        <span :class="`flag-icon flag-icon-${country.flag} me-2`"></span> {{
                                            country.code }}
                                    </li>
                                </ul>
                            </div>
                            <input type="text" class="form-control" id="branch_phone" v-model="form.branch_phone"
                                v-mask="'### ### ####'" required>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="adress" class="form-label">Branch Mail</label>
                        <input type="text" class="form-control" id="branch_mail" v-model="form.branch_mail" required>
                    </div>
                    <div class="mb-3">
                        <label for="adress" class="form-label">Branch Name Summary</label>
                        <input type="text" class="form-control" id="branch_name_summary"
                            v-model="form.branch_name_summary" required>
                    </div>

                    <div class="mb-3">
                        <label for="adress" class="form-label">Price Type</label>
                        <input type="text" class="form-control" id="branch_price_type" v-model="form.branch_price_type"
                            required>
                    </div>
                    <button type="submit" class="btn btn-primary">{{ editMode ? 'Update' : 'Add' }}</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mask } from 'vue-the-mask';
import { useBranchStore } from '../stores/branchStore';
import axios from 'axios';

import "../assets/css/views/Branch.css"

export default {
    name: "GroupBranchComp",
    directives: { mask },
    data() {
        return {
            groupBranches: [],
            fileData: null,
            countries: [
                { code: '+44', flag: 'gb' },
                { code: '+90', flag: 'tr' },
                { code: '+49', flag: 'de' },
                // Add more countries as needed
            ],
            selectedCountry: { code: '+44', flag: 'gb' },
            form: {
                branch_name: '',
                branch_name_summary: '',
                branch_price_type: '',
                branch_city: '',
                branch_address: '',
                branch_phone: '',
                branch_mail: '',
                branch_lat: '',
                branch_lng: '',
                branch_username: '',
            },
            branch_country_code: '+44',
            editMode: false,
        };
    },
    methods: {
        selectCountry(country) {
            this.selectedCountry = country;
            // Optionally, you can also store the selected country code in the form data
            this.form.branch_country_code = country.code;
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        handleFileChange(event) {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
                this.processFile(selectedFile);
            }
        },
        handleDrop(event) {
            const droppedFile = event.dataTransfer.files[0];
            if (droppedFile) {
                this.processFile(droppedFile);
            }
        },
        processFile(file) {
            this.file = file;
            this.fileName = file.name; // Display the file name
        },
        async submitFile() {
            if (!this.file) {
                this.uploadStatus = 'No file selected.';
                return;
            }

            const formData = new FormData();
            formData.append('file', this.file);

            try {
                this.uploadStatus = 'Uploading...';
                const response = await axios.post('https://panel.dinelim.ai/api/import', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                this.uploadStatus = `Upload successful: ${response.data.message}`;
            } catch (error) {
                this.uploadStatus = `Upload failed: ${error.response?.data?.message || error.message}`;
            }
        },

        async GroupBranchLoad() {
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            };
            try {
                const response = await axios.get('https://panel.dinelim.ai/api/group-branch', { headers });
                this.groupBranches = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        addBranch() {
            this.form = {
                branch_name: '',
                branch_name_summary: '',
                branch_price_type: '',
                branch_city: '',
                branch_address: '',
                branch_phone: '',
                branch_mail: '',
                branch_lat: '',
                branch_lng: '',
                branch_username: '',
            };
            this.editMode = false;

        },
        editBranch(branch) {
            this.form = { ...branch };
            this.editMode = true;

        },
        goToCategory(branch) {
            // Use the Pinia store to save the selected branch ID
            console.log(branch)
            const branchStore = useBranchStore();
            branchStore.setSelectedBranchId(branch.branch_id);
            console.log(this.$router)

            this.$router.push({ name: 'ProductManagement', params: { id: branch.branch_id } });
        },
        async saveBranch() {
            const fullPhoneNumber = `${this.branch_country_code} ${this.form.branch_phone}`;
            this.form.branch_phone = fullPhoneNumber;
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            };
            try {
                if (this.editMode) {
                    await axios.put(`http://127.0.0.1:8000/api/group-branch/${this.form.branch_id}`, this.form, { headers });
                } else {
                    await axios.post('http://127.0.0.1:8000/api/group-branch', this.form, { headers });
                }
                this.GroupBranchLoad();
            } catch (error) {
                console.error(error);
            }
        },
        async deleteBranch(id) {
            try {
                await axios.delete(`https://panel.dinelim.ai/api/group-branch/${id}`);
                this.GroupBranchLoad();
            } catch (error) {
                console.error(error);
            }
        }
    },
    mounted() {
        this.GroupBranchLoad();
    }
};
</script>


<style scoped>
.file-upload {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    cursor: pointer;
}

.upload-area {
    padding: 40px;
    border-radius: 4px;
    background-color: #f9f9f9;
    transition: background-color 0.3s ease;
}

.upload-area:hover {
    background-color: #e9e9e9;
}

.hidden {
    display: none;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
}

th {
    background-color: #f2f2f2;
}
</style>
