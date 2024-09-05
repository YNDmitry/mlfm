export function useSeoMetaUtil(seoData: any, appConfig: any) {
	useSeoMeta({
		title: seoData?.meta_title,
		twitterTitle: seoData?.meta_title,
		ogTitle: seoData?.meta_title,
		description: seoData?.meta_description,
		twitterDescription: seoData?.meta_description,
		ogDescription: seoData?.meta_description,
		twitterImage:
			appConfig.public.databaseUrl + 'assets/' + seoData?.og_image?.id,
		ogImage: appConfig.public.databaseUrl + 'assets/' + seoData?.og_image?.id,
	})
}
