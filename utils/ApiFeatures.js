export class ApiFeatures {
  constructor(query, queryStr) {
    (this.query = query), (this.queryStr = queryStr);
  }

  searchEmployee() {
    const keyword = this.queryStr.keyword
      ? {
          $or: [
            { username: { $regex: this.queryStr.keyword, $options: 'i' } },
            { role: { $regex: this.queryStr.keyword, $options: 'i' } },
            { idno: { $regex: this.queryStr.keyword, $options: 'i' } },
            { role: { $regex: this.queryStr.keyword, $options: 'i' } },
            { designation: { $regex: this.queryStr.keyword, $options: 'i' } },
          ],
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  employeesearch() {
    const keyword = this.queryStr.keyword
      ? {
          username: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  searchTitle() {
    const keyword = this.queryStr.keyword
      ? {
          $or: [{ title: { $regex: this.queryStr.keyword, $options: 'i' } }],
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  //Role search
  searchByRole() {
    const roles = this.queryStr.role
      ? {
          role: {
            $regex: this.queryStr.role,
            $options: 'i',
          },
        }
      : {};
    this.query = this.query.find({ ...roles });
    return this;
  }
  //Role search
  searchByDesignation() {
    const designation = this.queryStr.designation
      ? {
          designation: {
            $regex: this.queryStr.designation,
            $options: 'i',
          },
        }
      : {};
    this.query = this.query.find({ ...designation });
    return this;
  }

  //Pagination
  pagination() {
    let resultPerPage = this.queryStr.perpage;
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}
