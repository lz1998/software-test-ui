<template>
    <v-container>
        <v-container>
            <v-btn color="primary" @click="handleAddTestClick">新增测试</v-btn>
        </v-container>
        <v-container>
            <v-data-table
                    :server-items-length="dataPage.totalElements || 0"
                    :headers="headers"
                    :page.sync="pageNum"
                    @update:page="handlePageChange"
                    :items-per-page="10"
                    :items="dataPage.content || []">
                <template v-slot:item.actions="{ item }">
                    <v-btn class="mx-2" color="primary" @click="handleEditTestClick(item)" small>编辑</v-btn>
                    <v-btn class="mx-2" color="error" @click="handleDeleteTest(item)" small>删除</v-btn>
                </template>
            </v-data-table>

        </v-container>

        <v-dialog v-model="showTestEditDialog" width="1000">
            <v-card class="pa-4">
                <v-card-title>编辑测试</v-card-title>
                <v-text-field label="名称" v-model="currentTest.testName"></v-text-field>
                <v-text-field label="描述" v-model="currentTest.description"></v-text-field>
                <v-card-text>
                    <v-row v-for="step in currentTest.testSteps">
                        <v-col cols="3" sm="3">
                            <v-text-field label="xpath" v-model="step.xpath"></v-text-field>
                        </v-col>
                        <v-col cols="3" sm="3">
                            <v-select label="类型" v-model="step.type" :items="typeItems"></v-select>
                        </v-col>
                        <v-col cols="3" sm="3">
                            <v-text-field label="内容" v-model="step.value" :disabled="step.type!='input'"></v-text-field>
                        </v-col>
                        <v-col cols="3" sm="3">
                            <v-btn color="error"
                                   @click="currentTest.testSteps=currentTest.testSteps.filter(x=>x!=step)">删除
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="md-4">
                    <v-spacer/>
                    <v-btn @click="addNewStep" color="primary">增加步骤</v-btn>
                </v-card-actions>
                <v-card-actions class="mt-4">
                    <v-spacer/>
                    <v-btn color="warning" depressed v-clipboard:copy="generatedCode"
                           v-clipboard:success="handleCopySuccess">生成代码
                    </v-btn>
<!--                    <v-btn @click="handleGenerateCode" color="warning">生成代码</v-btn>-->
                    <v-btn @click="handleSaveTest" color="success">保存</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
    import {findTest, saveTest, deleteTest} from '@/api/myTest.js'

    export default {
        name: "testManage",
        data() {
            return {
                showTestEditDialog: false,
                headers: [
                    {
                        text: 'userId',
                        align: 'center',
                        value: 'userId',
                        sortable: false
                    },
                    {
                        text: 'testName',
                        align: 'center',
                        value: 'testName',
                        sortable: false
                    },
                    {
                        text: 'description',
                        align: 'center',
                        value: 'description',
                        sortable: false
                    },
                    {
                        text: '操作',
                        align: 'center',
                        value: 'actions',
                        sortable: false
                    }
                ],
                dataPage: {
                    content: [],
                    totalElements: 0
                },
                pageNum: 1,
                currentTest: {
                    testName: '',
                    description: '',
                    testJsonStr: '',
                    testSteps: []
                },
                typeItems: [
                    {
                        text: '输入',
                        value: 'input'
                    },
                    {
                        text: '点击',
                        value: 'click'
                    },

                ],
            }
        },
        methods: {
            handleSearch(pageNum, size) {
                let data = {
                    page: pageNum - 1,
                    size
                }
                findTest(data).then(res => {
                    this.dataPage = res.data
                })
            },
            handlePageChange() {
                this.handleSearch(this.pageNum, 10)
            },

            handleAddTestClick() {
                this.currentTest = {
                    testName: '',
                    description: '',
                    testJsonStr: '',
                    testSteps: []
                }
                this.showTestEditDialog = true
            },
            handleEditTestClick(item) {
                console.log(item)
                this.currentTest = {
                    testName: item.testName,
                    description: item.description,
                    testJsonStr: '',
                    testSteps: JSON.parse(item.testJsonStr)
                }
                this.showTestEditDialog = true
            },
            handleSaveTest() {
                let data = {
                    testName: this.currentTest.testName,
                    description: this.currentTest.description,
                    testJsonStr: JSON.stringify(this.currentTest.testSteps),
                }
                saveTest(data).then(res => {
                    alert("保存成功")
                    this.showTestEditDialog = false
                    this.handlePageChange()
                })
            },
            handleDeleteTest(item){
                let data={
                    testId:item.testId
                }
                deleteTest(data).then(res=>{
                    this.handlePageChange()
                })
            },
            addNewStep() {
                this.currentTest.testSteps.push({
                    xpath: '',
                    type: '',
                    value: ''
                })
            },
            handleGenerateCode() {


            },
            handleCopySuccess(){
                alert("复制成功")
            }


        },
        mounted() {
            this.handlePageChange()
        },
        computed:{
            generatedCode(){
                let result = ""
                this.currentTest.testSteps.forEach(step => {
                    if (step["type"] == "input") {
                        result += `\nwebDriver.findElement(By.xpath("${step["xpath"]}")).sendKeys("${step["value"]}");`
                    } else if (step["type"] == "click") {
                        result += `\nwebDriver.findElement(By.xpath("${step["xpath"]}")).click();`
                    }
                })
                console.log(result)
                return result
            }
        }
    }
</script>

<style scoped>

</style>