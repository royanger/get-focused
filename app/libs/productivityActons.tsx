import { updateOrCreateProductivity } from '~/queries/updateOrCreateProductivity'

export async function validateProductivityForm(formData, user) {
  console.log('formData for productivity', formData)

  if (formData.get(`productivity-new`)) {
    // this is new wellness entry and no an edit/update
    // create entry in database
    const results = await updateOrCreateProductivity(
      formData.get('id'),
      formData.get('rating'),
      user.id
    )

    return null
  }

  let productivityScore = []
  new Array(10).fill(undefined).map((_, index) => {
    if (formData.get(`productivity-${index + 1}`)) {
      productivityScore.push(index)
    }
  })

  console.log('productivityScore', productivityScore)

  const errors = {}
  if (productivityScore.length < 1) {
    errors.formType = 'productivity'
    errors.msg = 'Please enter a productivity score'
  }

  if (Object.keys(errors).length) {
    return errors
  }

  // latter we need to update the database

  const results = await updateOrCreateProductivity(
    formData.get('id'),
    parseInt(formData.get('rating')),
    user.id
  )
  return null
}
