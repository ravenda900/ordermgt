<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8"></base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow"
                         :class="type === 'dark' ? 'bg-default': ''">
                      <div class="card-header border-0"
                           :class="type === 'dark' ? 'bg-transparent': ''">
                        <div class="row align-items-center">
                          <div class="col">
                            <h3 class="mb-0">
                              Order Items
                            </h3>
                          </div>
                          <div class="col text-right">
                            <base-button type="primary" size="sm">See all</base-button>
                          </div>
                        </div>
                      </div>

                      <div class="table-responsive">
                        <base-table class="table align-items-center table-flush"
                                    :class="type === 'dark' ? 'table-dark': ''"
                                    :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                                    tbody-classes="list"
                                    :data="tableData">
                          <template slot="columns">
                            <th>Id</th>
                            <th>Order Id</th>
                            <th>Price Per Unit</th>
                            <th>Quantity</th>
                            <th>Product Name</th>
                            <th></th>
                          </template>

                          <template slot-scope="{row}">
                            <th scope="row">
                              {{row.orderItemId}}
                            </th>
                            <td class="budget">
                              {{row.orderId}}
                            </td>
                            <td>
                              {{row.pricePerUnit}}
                            </td>
                            <td>
                              {{row.quantity}}
                            </td>

                            <td>
                              {{row.productName}}
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

                        </base-table>
                      </div>

                      <div class="card-footer d-flex justify-content-end"
                           :class="type === 'dark' ? 'bg-transparent': ''">
                        <base-pagination total="30"></base-pagination>
                      </div>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import faker from 'faker';

  export default {
    name: 'order-items',
    data() {
      const tableData = [];

      for (let i = 0 ; i < faker.random.number() ; i++) {
        tableData.push({
          orderItemId: faker.random.number(),
          orderId: faker.random.number(),
          pricePerUnit: faker.commerce.price(),
          quantity: faker.random.number(),
          productName: faker.commerce.productName()
        })
      }

      return {
        tableData: tableData
      }
    }
  };
</script>
<style></style>
