<template>
    <div class="container mt-4">
   
        <div class="d-flex justify-content-end mb-3 mt-3">
            <button class="btn btn-primary" @click="addBranch">Add New Branch</button>
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
                            <i class="bi bi-view-stacked me-2 pe-auto cursor-pointer"
                                @click="goToCategory(branch)"></i>
                            <i class="bi bi-pencil-square me-2 pe-auto cursor-pointer" @click="editBranch(branch)"></i>
                            <i class="bi bi-trash3 pe-auto cursor-pointer" @click="deleteBranch(branch.branch_id)"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!groupBranches.length" class="col-12">
            Loading...
        </div>
        <div class="modal fade" id="branchModal" tabindex="-1" aria-labelledby="branchModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="branchModalLabel">{{ editMode ? 'Edit Branch' : 'Add Branch' }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveBranch">
                            <div class="mb-3">
                                <label for="branchName" class="form-label">Branch Name</label>
                                <input type="text" class="form-control" id="branchName" v-model="form.branch_name"
                                    required>
                            </div>
                            <div class="mb-3">
                                <label for="city" class="form-label">Branch Name</label>
                                <input type="text" class="form-control" id="branch_city" v-model="form.branch_city"
                                    required>
                            </div>
                            <button type="submit" class="btn btn-primary">{{ editMode ? 'Update' : 'Add' }}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useBranchStore } from '../stores/branchStore';
import axios from 'axios';
import { Modal } from 'bootstrap';
import "../assets/css/views/Branch.css"

export default {
    name: "GroupBranchComp",
    data() {
        return {
            groupBranches: [],
            fileData: null,
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
            editMode: false,
        };
    },
    methods: {
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
            };
            this.editMode = false;
            const modal = new Modal(document.getElementById('branchModal'));
            modal.show();
        },
        editBranch(branch) {
            this.form = { ...branch };
            this.editMode = true;
            const modal = new Modal(document.getElementById('branchModal'));
            modal.show();
        },
        goToCategory(branch) {
            // Use the Pinia store to save the selected branch ID
            console.log(branch)
            const branchStore = useBranchStore();
            branchStore.setSelectedBranchId(branch.branch_id);

            this.$router.push({ name: 'ProductManagement', params: { id: branch.branch_id } });
        },
        async saveBranch() {
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            };
            try {
                if (this.editMode) {
                    await axios.put(`https://panel.dinelim.ai/api/group-branch/${this.form.branch_id}`, this.form, { headers });
                } else {
                    await axios.post('https://panel.dinelim.ai/api/group-branch', this.form, { headers });
                }
                this.GroupBranchLoad();
                const modal = new Modal(document.getElementById('branchModal'));
                modal.hide();
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
