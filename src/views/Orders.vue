<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8"></base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                      <div class="card-header border-0">
                        <div class="row align-items-center">
                          <div class="col">
                            <h3 class="mb-5">
                              Orders
                            </h3>
                          </div>
                        </div>
                        <div class="row align-items-center">
                          <div class="col">
                            <b-form-group label-cols-sm="3" label="Search" class="mb-0">
                              <b-input-group>
                                <b-form-input
                                  v-model="filter">
                                </b-form-input>
                                <b-input-group-append>
                                  <b-button
                                    variant="primary"
                                    :disabled="!filter"
                                    @click="filter = ''"
                                    v-b-tooltip
                                    title="Clear">
                                    <i class="fa fa-times" aria-hidden="true"></i>
                                  </b-button>
                                </b-input-group-append>
                              </b-input-group>
                            </b-form-group>
                          </div>
                          <div class="col">
                            <b-form-group
                              label-cols-sm="3"
                              class="mb-0"
                              label="Display Size"
                              label-for="displaySize">
                              <multiselect
                                id="displaySize"
                                v-model="perPage"
                                :show-labels="false"
                                :options="pageOptions">
                              </multiselect>
                            </b-form-group>
                          </div>
                        </div>
                      </div>

                      <div class="table-responsive">
                        <b-table
                          ref="table"
                          api-url="order"
                          :no-sort-reset="true"
                          :sort-by.sync="sortBy"
                          :sort-desc.sync="sortDesc"
                          :sort-direction="sortDirection"
                          :current-page="currentPage"
                          :per-page="perPage"
                          :filter="filter"
                          :items="provider"
                          :fields="fields"
                          @filtered="onFiltered"
                          show-empty>

                          <!-- <template v-slot:cell(actions)="row">
                            <b-button-group>
                              <b-button
                                variant="outline-success"
                                size="sm"
                                v-b-tooltip.hover
                                :to="{ name: 'EditArea', params: { id: row.item['areas.id'] } }"
                                title="Edit"
                                v-if="canUpdate">
                                <i class="fa fa-pencil" aria-hidden="true"></i>
                              </b-button>
                              <b-button
                                variant="outline-danger"
                                size="sm"
                                v-b-tooltip.hover
                                @click="showDialog(row.item)"
                                title="Delete"
                                v-if="canDelete">
                                <i class="fa fa-trash" aria-hidden="true"></i>
                              </b-button>
                            </b-button-group>
                          </template> -->
                        </b-table>
                        <!-- <base-table class="table align-items-center table-flush"
                                    :thead-classes="'thead-light'"
                                    tbody-classes="list"
                                    :data="tableData">
                          <template slot="columns">
                            <th>Order Id</th>
                            <th>Order Date</th>
                            <th>Order Name</th>
                            <th>Customer Name</th>
                            <th></th>
                          </template>

                          <template slot-scope="{row}">
                            <th scope="row">
                              {{row.orderId}}
                            </th>
                            <td>
                              {{row.orderDate}}
                            </td>
                            <td>
                              {{row.orderName}}
                            </td>
                            <td>
                              {{row.customerName}}
                            </td>

                            <td class="text-right">
                              <base-dropdown class="dropdown"
                                             position="right">
                                <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <i class="fas fa-ellipsis-v"></i>
                                </a>

                                <template>
                                  <a class="dropdown-item" href="#">Action</a>
                                  <a class="dropdown-item" href="#">Another action</a>
                                  <a class="dropdown-item" href="#">Something else here</a>
                                </template>
                              </base-dropdown>
                            </td>

                          </template>

                        </base-table> -->
                      </div>

                      <div class="card-footer d-flex justify-content-end">
                        <!-- <base-pagination total="30"></base-pagination> -->
                        <b-pagination
                          v-model="currentPage"
                          :total-rows="totalRows"
                          :per-page="perPage"
                          class="my-0"
                        ></b-pagination>
                      </div>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import faker from 'faker';
  import api from '@/api';

  export default {
    name: 'orders',
    data() {
      const tableData = [];

      for (let i = 0 ; i < 100 ; i++) {
        tableData.push({
          orderId: faker.random.number(),
          orderDate: faker.date.future(),
          orderName: faker.commerce.productName(),
          customerName: faker.name.findName()
        })
      }

      return {
        tableData: tableData,
        fields: [
          { key: 'orderId', label: 'Order ID', sortable: true, sortDirection: 'asc' },
          { key: 'orderDate', label: 'Order Date', sortable: true, sortDirection: 'desc' },
          { key: 'orderName', label: 'Order Name', sortable: true, sortDirection: 'asc' },
          { key: 'customerName', label: 'Customer Name', sortable: true, sortDirection: 'asc' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [10, 25, 50],
        sortBy: 'orderId',
        sortDirection: 'last',
        sortDesc: false,
        filter: ''
      }
    },
    methods: {
      provider ({ apiUrl, filter, sortBy, sortDesc, perPage, currentPage }, callback) {
        api.getTableData(apiUrl, {
          filter,
          sortBy,
          sortDesc,
          perPage,
          currentPage
        })
          .then(({ data }) => {
            this.totalRows = 30

            callback(data)
          })
          .catch(() => {
            this.notifyError('Unable to fetch areas')

            callback([])
          })
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  };
</script>
<style></style>
